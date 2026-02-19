/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { AsnConvert } from '@peculiar/asn1-schema';
import { CertificateList } from '@peculiar/asn1-x509';
import { Convert } from 'pvtsutils';
import { Download, getStringByOID } from '../utils';
import type {
  TJsonRenderFormat,
  TJsonRenderValue,
  IJsonRenderObject,
} from '../components/certificate-details-parts/json_to_html_parser';
import { ArrayFlat } from '../components/certificate-details-parts/json_to_html_parser';
import { ExtensionFactory } from './extensions';
import { AsnData } from './asn_data';
import { Name, INameJSON } from './name';
import { PemConverter } from './pem_converter';
import {
  certificateRawToBuffer,
  getCertificateThumbprint,
} from './utils';

interface ISignature {
  algorithm: string;
  value: BufferSource;
}

export class X509Crl extends AsnData<CertificateList> {
  public readonly issuer: INameJSON[];

  public readonly version: number;

  public readonly lastUpdate: Date;

  public readonly nextUpdate: Date;

  public thumbprints: Record<string, string> = {};

  public readonly type = 'X.509 Certificate Revocation List';

  public readonly tag = PemConverter.CrlTag;

  constructor(raw: string) {
    super(certificateRawToBuffer(raw), CertificateList);

    const { tbsCertList } = this.asn;

    this.issuer = new Name(tbsCertList.issuer).toJSON();
    this.version = tbsCertList.version + 1;
    this.lastUpdate = tbsCertList.thisUpdate.getTime();
    this.nextUpdate = tbsCertList.nextUpdate.getTime();
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

  public get signature(): ISignature {
    const { signature, signatureAlgorithm } = this.asn;

    return {
      value: signature,
      algorithm: signatureAlgorithm.algorithm,
    };
  }

  public get commonName(): string {
    if (!this.issuer) {
      return '';
    }

    for (let i = 0; i < this.issuer.length; i += 1) {
      const name = this.issuer[i];

      if (name.shortName === 'CN' || name.shortName === 'E' || name.shortName === 'O') {
        return name.value;
      }
    }

    return '';
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
    Download.crl.asPEM(
      this.toString('pem'),
      name || this.commonName,
    );
  }

  public downloadAsDER(name?: string) {
    Download.crl.asDER(
      this.raw,
      name || this.commonName,
    );
  }

  public toJSON(): TJsonRenderFormat {
    const { tbsCertList } = this.asn;

    const extensionItems: TJsonRenderValue[] = (tbsCertList.crlExtensions || []).map((e) => (
      ExtensionFactory.toJSON(AsnConvert.serialize(e))
    ));

    const revokedItems: IJsonRenderObject[] = (tbsCertList.revokedCertificates || []).map((revoked) => {
      return {
        [`${Convert.ToHex(revoked.userCertificate)} (serial number)`]: {
          'Revocation Date': revoked.revocationDate.getTime().toISOString(),
          Extensions: ArrayFlat.from(revoked.crlEntryExtensions?.map((e) => ExtensionFactory.toJSON(AsnConvert.serialize(e))) || []),
        },
      };
    });

    const result: TJsonRenderFormat = {
      'Basic Information': {
        Type: this.type,
        Version: this.version,
        'Last Update': this.lastUpdate.toISOString(),
        'Next Update': this.nextUpdate.toISOString(),
      },
      'Issuer Name': new ArrayFlat(...this.issuer.map((n) => ({ [n.name]: n.value }))),
      Signature: this.getSignatureJson(),
      Fingerprints: this.thumbprints,
      ...(extensionItems.length > 0 && { Extensions: ArrayFlat.from(extensionItems) }),
      ...(revokedItems.length > 0 && { 'Revoked Certificates': ArrayFlat.from(revokedItems) }),
    };

    return result;
  }

  private getSignatureJson(): IJsonRenderObject {
    const { algorithm, value } = this.signature;

    return {
      Algorithm: getStringByOID(algorithm),
      Value: Convert.ToHex(value),
    };
  }
}
