import { AsnConvert } from '@peculiar/asn1-schema';
import { ECParameters, id_ecPublicKey } from '@peculiar/asn1-ecc';
import { id_rsaEncryption, RSAPublicKey } from '@peculiar/asn1-rsa';
import { Certificate } from '@peculiar/asn1-x509';
import { Convert } from 'pvtsutils';

import { dateDiff, validator } from '../utils';

import { cryptoProvider } from './provider';
import { Name, INameJSON } from './name';
import { Extension, TExtensionValue } from './extension';
import { AsnData } from './asn_data';

export interface ISignature {
  algorithm: string;
  value: BufferSource;
}

export interface IPublicKey {
  algorithm: string;
  value: BufferSource;
  params?: ECParameters | RSAPublicKey;
}

export class X509Certificate extends AsnData<Certificate> {
  public readonly serialNumber: string;

  public readonly subject: INameJSON[];

  public readonly issuer: INameJSON[];

  public readonly notBefore: Date;

  public readonly notAfter: Date;

  public readonly validity: string;

  public extensions: Extension<TExtensionValue>[];

  public readonly version: number;

  public thumbprints: Record<string, string> = {};

  private static base64Clear(base64: string) {
    return base64
      .replace(/.*base64,/, '')
      .replace(/-----.+-----/g, '')
      .replace(/[\s\r\n]/g, '');
  }

  private static rawClarify(raw: string): ArrayBuffer {
    const value = X509Certificate.base64Clear(raw);
    let certificateBuffer: ArrayBuffer;

    if (validator.isHex(value)) {
      certificateBuffer = Convert.FromHex(value);
    } else if (validator.isBase64(value) || validator.isPem(value)) {
      certificateBuffer = Convert.FromBase64(value);
    } else {
      certificateBuffer = Convert.FromBinary(raw);
    }

    return certificateBuffer;
  }

  constructor(raw: string) {
    super(X509Certificate.rawClarify(raw), Certificate);

    const { tbsCertificate } = this.asn;

    this.serialNumber = Convert.ToHex(tbsCertificate.serialNumber);
    this.subject = new Name(tbsCertificate.subject).toJSON();
    this.issuer = new Name(tbsCertificate.issuer).toJSON();
    this.version = tbsCertificate.version + 1;

    const notBefore = tbsCertificate.validity.notBefore.utcTime
      || tbsCertificate.validity.notBefore.generalTime;

    if (!notBefore) {
      throw new Error("Cannot get 'notBefore' value");
    }

    this.notBefore = notBefore;

    const notAfter = tbsCertificate.validity.notAfter.utcTime
      || tbsCertificate.validity.notAfter.generalTime;

    if (!notAfter) {
      throw new Error("Cannot get 'notAfter' value");
    }

    this.notAfter = notAfter;
    this.validity = dateDiff(this.notBefore, this.notAfter);
  }

  public parseExtensions() {
    const { tbsCertificate } = this.asn;

    if (tbsCertificate.extensions) {
      this.extensions = tbsCertificate.extensions
        .map((e) => new Extension(AsnConvert.serialize(e)));
    }
  }

  public get publicKey(): IPublicKey {
    const { subjectPublicKey, algorithm } = this.asn.tbsCertificate.subjectPublicKeyInfo;
    let params;

    if (algorithm.algorithm === id_ecPublicKey && algorithm.parameters) {
      params = AsnConvert.parse(algorithm.parameters, ECParameters);
    }

    if (algorithm.algorithm === id_rsaEncryption) {
      params = AsnConvert.parse(subjectPublicKey, RSAPublicKey);
    }

    const spki = AsnConvert.serialize(this.asn.tbsCertificate.subjectPublicKeyInfo);

    return {
      params,
      value: spki,
      algorithm: algorithm.algorithm,
    };
  }

  public get signature(): ISignature {
    const { signatureValue, signatureAlgorithm } = this.asn;

    return {
      value: signatureValue,
      algorithm: signatureAlgorithm.algorithm,
    };
  }

  public export(type: 'base64' | 'hex' | 'pem'): string {
    if (type === 'base64') {
      return Convert.ToBase64(this.raw);
    }

    if (type === 'hex') {
      return X509Certificate.stringToHex(Convert.ToHex(this.raw));
    }

    if (type === 'pem') {
      return X509Certificate.base64ToPem(Convert.ToBase64(this.raw));
    }

    return '';
  }

  static base64ToPem(base64: string) {
    return `-----BEGIN CERTIFICATE-----\n${base64.replace(/(.{64})/g, '$1\n')}\n-----END CERTIFICATE-----`;
  }

  static stringToHex(value: string) {
    return value
      .replace(/(.{32})/g, '$1\n')
      .replace(/(.{4})/g, '$1 ')
      .trim();
  }

  public async getThumbprint(
    algorithm: globalThis.AlgorithmIdentifier = 'SHA-1',
  ): Promise<void> {
    try {
      const crypto = cryptoProvider.get();
      const thumbprint = await crypto.subtle.digest(algorithm, this.raw);

      this.thumbprints[algorithm['name'] || algorithm] = Convert.ToHex(thumbprint);
    } catch (error) {
      console.error('Error thumbprint get:', error);
    }
  }

  public get commonName(): string {
    if (!this.subject) {
      return '';
    }

    for (let i = 0; i < this.subject.length; i += 1) {
      const name = this.subject[i];

      if (name.name === 'CN' || name.name === 'E' || name.name === 'O') {
        return name.value;
      }
    }

    return '';
  }

  public get issuerCommonName(): string {
    if (!this.issuer) {
      return '';
    }

    for (let i = 0; i < this.issuer.length; i += 1) {
      const name = this.issuer[i];

      if (name.name === 'CN') {
        return name.value;
      }

      if (name.name === 'E') {
        return name.value;
      }
    }

    return '';
  }

  public get isRoot(): boolean {
    return JSON.stringify(this.issuer) === JSON.stringify(this.subject);
  }
}
