/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AsnConvert } from '@peculiar/asn1-schema';
import type { GeneralName } from '@peculiar/asn1-x509';
import { AttributeCertificate, Holder } from '@peculiar/asn1-x509-attr';
import { Convert } from 'pvtsutils';
import { dateDiff, Download } from '../utils';
import { AsnData } from './asn_data';
import { Extension, TExtensionValue } from './extension';
import { Attribute, TAttributeValue } from './attribute';
import { PemConverter } from './pem_converter';
import {
  certificateRawToBuffer,
  getCertificateThumbprint,
} from './utils';

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

  public readonly type = 'X.509 Attribute Certificate';

  public readonly tag = PemConverter.AttributeCertificateTag;

  constructor(raw: string) {
    super(certificateRawToBuffer(raw), AttributeCertificate);

    const { acinfo } = this.asn;

    this.serialNumber = Convert.ToHex(acinfo.serialNumber);
    this.version = acinfo.version;

    const notBefore = acinfo.attrCertValidityPeriod.notBeforeTime;

    if (!notBefore) {
      throw new Error('Cannot get \'notBefore\' value');
    }

    this.notBefore = notBefore;

    const notAfter = acinfo.attrCertValidityPeriod.notAfterTime;

    if (!notAfter) {
      throw new Error('Cannot get \'notAfter\' value');
    }

    this.notAfter = notAfter;
    this.validity = dateDiff(this.notBefore, this.notAfter);
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
    algorithm = 'SHA-1',
  ): Promise<void> {
    try {
      const thumbprint = await getCertificateThumbprint(algorithm, this.raw);

      if (thumbprint) {
        this.thumbprints[algorithm] = Convert.ToHex(thumbprint);
      }
    } catch (error) {
      console.error('Error thumbprint get:', error);
    }
  }

  public get commonName(): string {
    return `attribute-certificate-${this.thumbprints['SHA-1']}`;
  }

  public toString(format: 'pem' | 'base64' | 'base64url' = 'pem'): string {
    switch (format) {
      case 'pem':
        return PemConverter.encode(this.raw, this.tag);
      case 'base64url':
        return Convert.ToBase64Url(this.raw);
      default:
        return Convert.ToBase64(this.raw);
    }
  }

  public downloadAsPEM(name?: string) {
    Download.attrCert.asPEM(
      this.toString('pem'),
      name || this.commonName,
    );
  }

  public downloadAsDER(name?: string) {
    Download.attrCert.asDER(
      this.raw,
      name || this.commonName,
    );
  }
}
