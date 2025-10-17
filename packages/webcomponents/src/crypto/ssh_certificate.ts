import { SshCertificate as SshCertificateType, parseCertificate } from '@peculiar/ssh';
import { Convert } from 'pvtsutils';
import { dateDiff, Download } from '../utils';

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
    const blob = parseCertificate(raw.trim());

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
      thumbprint: Convert.ToBase64(thumbprint),
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
      thumbprint: Convert.ToBase64(thumbprint),
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async toString(_format: 'pem' | 'base64' | 'base64url' = 'pem') {
    return this.#cert.toSSH();
  }

  public get commonName(): string {
    return this.#cert.principals.join('_') || this.#cert.keyId || this.#cert.certType;
  }

  public async downloadAsSSH(name?: string) {
    Download.certSSH.asSSH(
      await this.toString(),
      name || this.commonName,
    );
  }
}
