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

import { cryptoProvider } from './provider';
import { dateDiff } from '../utils';

import { AsnData } from './asn_data';
import { Extension, TExtensionValue } from './extension';
import { Attribute, TAttributeValue } from './attribute';
import {
  certificateRawToBuffer,
  hexFormat,
  base64Format,
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

  constructor(raw: string) {
    super(certificateRawToBuffer(raw), AttributeCertificate);

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

  public exportAsBase64() {
    return Convert.ToBase64(this.raw);
  }

  public exportAsHexFormatted() {
    return hexFormat(Convert.ToHex(this.raw));
  }

  public exportAsPemFormatted() {
    return `-----BEGIN ATTRIBUTE CERTIFICATE-----\n${base64Format(this.exportAsBase64())}\n-----END ATTRIBUTE CERTIFICATE-----`;
  }

  public get commonName(): string {
    return `attribute-certificate-${this.thumbprints['SHA-1']}`;
  }
}
