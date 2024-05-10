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
import {
  id_pkcs9_at_extensionRequest,
  ExtensionRequest,
} from '@peculiar/asn1-pkcs9';
import { Convert } from 'pvtsutils';

import { Download } from '../utils';

import { AsnData } from './asn_data';
import { Name, INameJSON } from './name';
import { Attribute, TAttributeValue } from './attribute';
import { Extension, TExtensionValue } from './extension';
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

interface IPublicKey {
  algorithm: string;
  value: BufferSource;
  params?: ECParameters | RSAPublicKey;
}

export class Pkcs10CertificateRequest extends AsnData<CertificationRequest> {
  public readonly subject: INameJSON[];

  public readonly version: number;

  public attributes: Attribute<TAttributeValue>[];

  public extensions: Extension<TExtensionValue>[];

  public thumbprints: Record<string, string> = {};

  public readonly type = 'PKCS#10 Certificate Request';

  public readonly tag = 'CERTIFICATE REQUEST';

  constructor(raw: string) {
    super(certificateRawToBuffer(raw), CertificationRequest);

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

  public parseAttributes() {
    const { certificationRequestInfo } = this.asn;

    if (certificationRequestInfo.attributes) {
      this.attributes = certificationRequestInfo.attributes
        .map((e) => new Attribute(AsnConvert.serialize(e)));

      const extensionRequestAttribute = this.attributes.find(
        (attribute) => attribute.asn.type === id_pkcs9_at_extensionRequest,
      ) as Attribute<ExtensionRequest>;

      if (extensionRequestAttribute) {
        this.extensions = extensionRequestAttribute.value
          .map((e) => new Extension(AsnConvert.serialize(e)));
      }
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
    Download.csr.asPEM(
      this.toString('pem'),
      name || this.commonName,
    );
  }

  public downloadAsDER(name?: string) {
    Download.csr.asDER(
      this.toString('hex'),
      name || this.commonName,
    );
  }
}
