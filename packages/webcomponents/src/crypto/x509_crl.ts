/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { AsnConvert } from '@peculiar/asn1-schema';
import { CertificateList, Time } from '@peculiar/asn1-x509';
import { Convert } from 'pvtsutils';

import { Download } from '../utils';

import { Extension, TExtensionValue } from './extension';
import { AsnData } from './asn_data';
import { Name, INameJSON } from './name';
import {
  certificateRawToBuffer,
  hexFormat,
  base64Format,
  getCertificateThumbprint,
} from './utils';

interface ISignature {
  algorithm: string;
  value: BufferSource;
}

export interface IRevokedCertificate {
  userCertificate: ArrayBuffer;
  revocationDate: Time;
  crlEntryExtensions?: Extension<TExtensionValue>[];
}

export class X509Crl extends AsnData<CertificateList> {
  public readonly issuer: INameJSON[];

  public readonly version: number;

  public readonly lastUpdate: Date;

  public readonly nextUpdate: Date;

  public extensions: Extension<TExtensionValue>[];

  public revokedCertificates: IRevokedCertificate[];

  public thumbprints: Record<string, string> = {};

  public readonly type = 'X.509 Certificate Revocation List';

  public readonly tag = 'X509 CRL';

  constructor(raw: string) {
    super(certificateRawToBuffer(raw), CertificateList);

    const { tbsCertList } = this.asn;

    this.issuer = new Name(tbsCertList.issuer).toJSON();
    this.version = tbsCertList.version + 1;
    this.lastUpdate = tbsCertList.thisUpdate.getTime();
    this.nextUpdate = tbsCertList.nextUpdate.getTime();

    this.revokedCertificates = (tbsCertList.revokedCertificates || [])
      .map((revokedCertificate) => ({
        revocationDate: revokedCertificate.revocationDate,
        userCertificate: revokedCertificate.userCertificate,
        crlEntryExtensions: revokedCertificate.crlEntryExtensions
          ?.map((e) => new Extension(AsnConvert.serialize(e))),
      }));
  }

  public async getThumbprint(
    algorithm: string = 'SHA-1',
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

  public parseExtensions() {
    const { tbsCertList } = this.asn;

    if (tbsCertList.crlExtensions) {
      this.extensions = tbsCertList.crlExtensions
        .map((e) => new Extension(AsnConvert.serialize(e)));
    }
  }

  public toString(format: 'hex' | 'pem' | 'base64' = 'pem'): string {
    switch (format) {
      case 'hex':
        return hexFormat(Convert.ToHex(this.raw));
      case 'pem':
        return `-----BEGIN ${this.tag}-----\n${base64Format(this.toString('base64'))}\n-----END ${this.tag}-----`;
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
      this.toString('hex'),
      name || this.commonName,
    );
  }
}
