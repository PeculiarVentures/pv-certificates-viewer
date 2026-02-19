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
import { dateDiff, Download, getStringByOID } from '../utils';
import type {
  TJsonRenderFormat,
  TJsonRenderValue,
  IJsonRenderObject,
} from '../components/certificate-details-parts/json_to_html_parser';
import { ArrayFlat } from '../components/certificate-details-parts/json_to_html_parser';
import { AttributeFactory } from './attributes';
import { AsnData } from './asn_data';
import { ExtensionFactory } from './extensions';
import { GeneralNameParser } from './extensions/general_name_parser';
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

  public toJSON(): TJsonRenderFormat {
    const { acinfo } = this.asn;

    const extensionItems: TJsonRenderValue[] = (acinfo.extensions || []).map((e) => (
      ExtensionFactory.toJSON(AsnConvert.serialize(e))
    ));

    const attributeItems: TJsonRenderValue[] = (acinfo.attributes || []).map((attrAsn) => (
      AttributeFactory.toJSON(AsnConvert.serialize(attrAsn))
    ));

    return {
      'Basic Information': {
        Type: this.type,
        'Serial Number': this.serialNumber,
        Version: this.version,
        Validity: this.validity,
        'Not Before': this.notBefore.toISOString(),
        'Not After': this.notAfter.toISOString(),
      },
      'Issuer Name': ArrayFlat.from(this.issuer.map((item) => (
        GeneralNameParser.toObject(item)
      ))),
      Holder: {
        ...(this.holder.baseCertificateID && {
          'Base Certificate ID': {
            Serial: Convert.ToHex(this.holder.baseCertificateID.serial),
            Issuer: this.holder.baseCertificateID.issuer.map((item) => (
              GeneralNameParser.toObject(item)
            )),
          },
        }),
        ...(this.holder.entityName && {
          'Entity Name': this.holder.entityName.map((item) => (
            GeneralNameParser.toObject(item)
          )),
        }),
        ...(this.holder.objectDigestInfo && {
          'Digest Info': {
            Algorithm: this.holder.objectDigestInfo.digestAlgorithm.algorithm,
            Value: Convert.ToHex(this.holder.objectDigestInfo.objectDigest),
            Type: this.holder.objectDigestInfo.digestedObjectType,
          },
        }),
      },
      Signature: this.getSignatureJson(),
      Fingerprints: this.thumbprints,
      ...(attributeItems.length > 0 && { Attributes: ArrayFlat.from(attributeItems) }),
      ...(extensionItems.length > 0 && { Extensions: ArrayFlat.from(extensionItems) }),
    };
  }

  private getSignatureJson(): IJsonRenderObject {
    const { algorithm, value } = this.signature;

    return {
      Algorithm: getStringByOID(algorithm),
      Value: Convert.ToHex(value),
    };
  }
}
