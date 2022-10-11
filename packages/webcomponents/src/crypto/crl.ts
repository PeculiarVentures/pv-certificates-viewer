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

export class CRL extends AsnData<CertificateList> {
  public readonly issuer: INameJSON[];

  public readonly version: number;

  public readonly lastUpdate: Date;

  public readonly nextUpdate: Date;

  public extensions: Extension<TExtensionValue>[];

  public thumbprints: Record<string, string> = {};

  public type: string = 'X.509 Certificate Revocation List';

  constructor(raw: string) {
    super(certificateRawToBuffer(raw), CertificateList);

    const { tbsCertList } = this.asn;

    this.issuer = new Name(tbsCertList.issuer).toJSON();
    this.version = tbsCertList.version + 1;
    this.lastUpdate = tbsCertList.thisUpdate.getTime();
    this.nextUpdate = tbsCertList.nextUpdate.getTime();
  }

  public async getThumbprint(
    algorithm: globalThis.AlgorithmIdentifier = 'SHA-1',
  ): Promise<void> {
    try {
      const thumbprint = await getCertificateThumbprint(algorithm, this.raw);
      if (thumbprint) {
        this.thumbprints[algorithm['name'] || algorithm] = Convert.ToHex(thumbprint);
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

  public exportAsBase64() {
    return Convert.ToBase64(this.raw);
  }

  public exportAsHexFormatted() {
    return hexFormat(Convert.ToHex(this.raw));
  }

  public exportAsPemFormatted() {
    return `-----BEGIN X509 CRL-----\n${base64Format(this.exportAsBase64())}\n-----END X509 CRL-----`;
  }

  public downloadAsPEM(name?: string) {
    Download.crl.asPEM(
      this.exportAsPemFormatted(),
      name || this.commonName,
    );
  }

  public downloadAsDER(name?: string) {
    Download.crl.asDER(
      this.exportAsHexFormatted(),
      name || this.commonName,
    );
  }
}
