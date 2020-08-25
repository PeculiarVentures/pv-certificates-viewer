import { AsnConvert } from '@peculiar/asn1-schema';
import type { GeneralName } from '@peculiar/asn1-x509';
import { AttributeCertificate, Holder } from '@peculiar/asn1-x509-attr';
import { Convert } from 'pvtsutils';

import { cryptoProvider } from './provider';
import * as dateFormatter from '../utils/date_formatter';
import validator from '../utils/validator';

import { AsnData } from './asn_data';
import { Extension, TExtensionValue } from './extension';
import { Attribute, TAttributeValue } from './attribute';

interface ISignature {
  algorithm: string;
  value: BufferSource;
}

export class X509AttributeCertificate extends AsnData<AttributeCertificate> {
  public readonly serialNumber: string;

  public readonly version: number;

  public readonly notBefore: Date;

  public readonly notAfter: Date;

  public readonly validity: string;

  public extensions: Extension<TExtensionValue>[];

  public attributes: Attribute<TAttributeValue>[];

  public thumbprints: Record<string, string> = {};

  public readonly issuer: GeneralName[];

  public holder: Holder;

  private static base64Clear(base64: string) {
    return base64
      .replace(/.*base64,/, '')
      .replace(/-----.+-----/g, '')
      .replace(/[\s\r\n]/g, '');
  }

  private static rawClarify(raw: string): ArrayBuffer {
    const value = X509AttributeCertificate.base64Clear(raw);
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
    super(X509AttributeCertificate.rawClarify(raw), AttributeCertificate);

    const { acinfo } = this.asn;

    this.serialNumber = Convert.ToHex(acinfo.serialNumber);
    this.version = acinfo.version;

    const notBefore = acinfo.attrCertValidityPeriod.notBeforeTime;

    if (!notBefore) {
      throw new Error("Cannot get 'notBefore' value");
    }

    this.notBefore = notBefore;

    const notAfter = acinfo.attrCertValidityPeriod.notAfterTime;

    if (!notAfter) {
      throw new Error("Cannot get 'notAfter' value");
    }

    this.notAfter = notAfter;
    this.validity = dateFormatter.diff(this.notBefore, this.notAfter);
    this.issuer = acinfo.issuer.v1Form || acinfo.issuer.v2Form?.issuerName;
    this.holder = acinfo.holder;
  }

  public get signature(): ISignature {
    const { signatureValue, signatureAlgorithm } = this.asn;

    return {
      value: signatureValue,
      algorithm: signatureAlgorithm.algorithm,
    };
  }

  public parseExtensions() {
    const { acinfo } = this.asn;

    if (acinfo.extensions) {
      this.extensions = acinfo.extensions
        .map((e) => new Extension(AsnConvert.serialize(e)));
    }
  }

  public parseAttributes() {
    const { acinfo } = this.asn;

    if (acinfo.attributes) {
      this.attributes = acinfo.attributes
        .map((e) => new Attribute(AsnConvert.serialize(e)));
    }
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

  public export(type: 'base64' | 'hex' | 'pem'): string {
    if (type === 'base64') {
      return Convert.ToBase64(this.raw);
    }

    if (type === 'hex') {
      return X509AttributeCertificate.stringToHex(Convert.ToHex(this.raw));
    }

    if (type === 'pem') {
      return X509AttributeCertificate.base64ToPem(Convert.ToBase64(this.raw));
    }

    return '';
  }

  static stringToHex(value: string) {
    return value
      .replace(/(.{32})/g, '$1\n')
      .replace(/(.{4})/g, '$1 ')
      .trim();
  }

  static base64ToPem(base64: string) {
    return `-----BEGIN ATTRIBUTE CERTIFICATE-----\n${base64.replace(/(.{64})/g, '$1\n')}\n-----END ATTRIBUTE CERTIFICATE-----`;
  }

  public get commonName(): string {
    return `attribute-certificate-${this.thumbprints['SHA-1']}`;
  }
}
