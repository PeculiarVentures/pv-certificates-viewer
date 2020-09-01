/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AsnConvert } from '@peculiar/asn1-schema';
import { ECParameters, id_ecPublicKey } from '@peculiar/asn1-ecc';
import { id_rsaEncryption, RSAPublicKey } from '@peculiar/asn1-rsa';
import { CertificationRequest } from '@peculiar/asn1-csr';
import { Convert } from 'pvtsutils';

import { cryptoProvider } from './provider';
import { validator } from '../utils';
import { AsnData } from './asn_data';
import { Name, INameJSON } from './name';
import { Attribute, TAttributeValue } from './attribute';

interface ISignature {
  algorithm: string;
  value: BufferSource;
}

interface IPublicKey {
  algorithm: string;
  value: BufferSource;
  params?: ECParameters | RSAPublicKey;
}

export class CSR extends AsnData<CertificationRequest> {
  public readonly subject: INameJSON[];

  public readonly version: number;

  public attributes: Attribute<TAttributeValue>[];

  public thumbprints: Record<string, string> = {};

  private static base64Clear(base64: string) {
    return base64
      .replace(/.*base64,/, '')
      .replace(/-----.+-----/g, '')
      .replace(/[\s\r\n]/g, '');
  }

  private static rawClarify(raw: string): ArrayBuffer {
    const value = CSR.base64Clear(raw);
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
    super(CSR.rawClarify(raw), CertificationRequest);

    const { certificationRequestInfo } = this.asn;

    this.subject = new Name(certificationRequestInfo.subject).toJSON();
    this.version = certificationRequestInfo.version;
  }

  public get publicKey(): IPublicKey {
    const { subjectPublicKey, algorithm } = this.asn.certificationRequestInfo.subjectPKInfo;
    let params;

    if (algorithm.algorithm === id_ecPublicKey && algorithm.parameters) {
      params = AsnConvert.parse(algorithm.parameters, ECParameters);
    }

    if (algorithm.algorithm === id_rsaEncryption) {
      params = AsnConvert.parse(subjectPublicKey, RSAPublicKey);
    }

    const spki = AsnConvert.serialize(this.asn.certificationRequestInfo.subjectPKInfo);

    return {
      params,
      value: spki,
      algorithm: algorithm.algorithm,
    };
  }

  public get signature(): ISignature {
    const { signature, signatureAlgorithm } = this.asn;

    return {
      value: signature,
      algorithm: signatureAlgorithm.algorithm,
    };
  }

  public get commonName(): string {
    if (!this.subject) {
      return '';
    }

    for (let i = 0; i < this.subject.length; i += 1) {
      const name = this.subject[i];

      if (name.shortName === 'CN' || name.shortName === 'E' || name.shortName === 'O') {
        return name.value;
      }
    }

    return '';
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

  public parseAttributes() {
    const { certificationRequestInfo } = this.asn;

    if (certificationRequestInfo.attributes) {
      this.attributes = certificationRequestInfo.attributes
        .map((e) => new Attribute(AsnConvert.serialize(e)));
    }
  }

  static base64ToPem(base64: string) {
    return `-----BEGIN CERTIFICATE REQUEST-----\n${base64.replace(/(.{64})/g, '$1\n')}\n-----END CERTIFICATE REQUEST-----`;
  }

  static stringToHex(value: string) {
    return value
      .replace(/(.{32})/g, '$1\n')
      .replace(/(.{4})/g, '$1 ')
      .trim();
  }

  public export(type: 'base64' | 'hex' | 'pem'): string {
    if (type === 'base64') {
      return Convert.ToBase64(this.raw);
    }

    if (type === 'hex') {
      return CSR.stringToHex(Convert.ToHex(this.raw));
    }

    if (type === 'pem') {
      return CSR.base64ToPem(Convert.ToBase64(this.raw));
    }

    return '';
  }
}
