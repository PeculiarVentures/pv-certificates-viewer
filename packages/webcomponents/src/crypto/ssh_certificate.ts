import { SshCertificate as SshCertificateType, parseCertificate } from '@peculiar/ssh';
import { base64, base64url, utf8 } from '@peculiar/utils/encoding';
import { dateDiff, decodeUtf8, Download } from '../utils';
import { isBase64UrlText } from './utils';

export class SshCertificate {
  public readonly serialNumber: string;

  public readonly notBefore: Date;

  public readonly notAfter: Date;

  public readonly validity: string;

  public readonly type: string;

  public readonly keyId: string;

  public readonly principals: string[];

  public readonly extensions: Record<string, string>;

  public readonly criticalOptions: Record<string, string>;

  public signatureKey: {
    algorithm: string;
    type: string;
    value: string;
    thumbprint: string;
  };

  public publicKey: {
    algorithm: string;
    type: string;
    value: string;
    thumbprint: string;
  };

  #cert: SshCertificateType;

  constructor(raw: string) {
    const text = raw.trim();
    const blob = parseCertificate(
      isBase64UrlText(text) ? decodeUtf8(base64url.decode(text)) : text,
    );

    // @ts-expect-error - SshCertificateType is not a constructor
    this.#cert = new SshCertificateType(blob) as SshCertificateType;

    this.notBefore = this.#cert.validAfter;
    this.notAfter = this.#cert.validBefore;
    this.validity = dateDiff(this.notBefore, this.notAfter);
    this.type = [this.#cert.blob.type, this.#cert.certType, this.#cert.type].join(' ');
    this.serialNumber = this.#cert.serial.toString();
    this.keyId = this.#cert.keyId;
    this.principals = this.#cert.principals;
    this.extensions = this.#cert.extensions;
    this.criticalOptions = this.#cert.criticalOptions;
  }

  public async parseSignatureKey() {
    const key = await this.#cert.signatureKey.toWebCrypto();
    const blob = this.#cert.signatureKey.getBlob();
    const thumbprint = await this.#cert.signatureKey.thumbprint('sha256');

    this.signatureKey = {
      algorithm: key.algorithm.name,
      type: blob.type,
      value: await this.#cert.signatureKey.toSSH(),
      thumbprint: base64.encode(thumbprint),
    };
  }

  public async parsePublicKey() {
    const key = await this.#cert.publicKey.toWebCrypto();
    const blob = this.#cert.publicKey.getBlob();
    const thumbprint = await this.#cert.publicKey.thumbprint('sha256');

    this.publicKey = {
      algorithm: key.algorithm.name,
      type: blob.type,
      value: await this.#cert.publicKey.toSSH(),
      thumbprint: base64.encode(thumbprint),
    };
  }

  public async toString(format: 'pem' | 'base64' | 'base64url' = 'pem') {
    if (format === 'base64url') {
      const blob = await this.#cert.toSSH();

      return base64url.encode(utf8.encode(blob));
    }

    return this.#cert.toSSH();
  }

  public get commonName(): string {
    return this.#cert.principals.join('_') || this.#cert.keyId || this.#cert.certType;
  }

  public async downloadAsPub(name?: string) {
    Download.certSSH.asPub(await this.toString(), name || [this.commonName, 'cert'].join('-'));
  }
}
