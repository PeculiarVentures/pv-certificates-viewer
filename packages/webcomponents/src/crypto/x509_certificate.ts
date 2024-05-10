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
import {
  id_composite_key,
  id_alg_composite,
  CompositePublicKey,
  CompositeSignatureValue,
  CompositeParams,
} from '@peculiar/asn1-x509-post-quantum';
import { Certificate, SubjectPublicKeyInfo } from '@peculiar/asn1-x509';
import { Convert } from 'pvtsutils';

import { dateDiff, Download } from '../utils';

import { Name, INameJSON } from './name';
import { Extension, TExtensionValue } from './extension';
import { AsnData } from './asn_data';
import {
  certificateRawToBuffer,
  hexFormat,
  base64Format,
  getCertificateThumbprint,
} from './utils';

export interface ISignature {
  algorithm: string;
  value: BufferSource;
  params?: {
    algorithm: string;
    value: BufferSource;
  }[];
}

export interface IPublicKey {
  algorithm: string;
  value: BufferSource;
  params?: ECParameters | RSAPublicKey | IPublicKey[];
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

  public readonly type = 'X.509 Certificate';

  public readonly tag = 'CERTIFICATE';

  constructor(raw: string) {
    super(certificateRawToBuffer(raw), Certificate);

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

  private getPublicKeyInfo(publicKeyInfo: SubjectPublicKeyInfo) {
    const { subjectPublicKey, algorithm } = publicKeyInfo;
    let params;

    if (algorithm.algorithm === id_ecPublicKey && algorithm.parameters) {
      params = AsnConvert.parse(algorithm.parameters, ECParameters);
    }

    if (algorithm.algorithm === id_rsaEncryption) {
      params = AsnConvert.parse(subjectPublicKey, RSAPublicKey);
    }

    if (algorithm.algorithm === id_composite_key) {
      params = AsnConvert.parse(subjectPublicKey, CompositePublicKey);

      params = params.map((param) => this.getPublicKeyInfo(param));
    }

    const spki = AsnConvert.serialize(publicKeyInfo);

    return {
      params,
      value: spki,
      algorithm: algorithm.algorithm,
    };
  }

  public get publicKey(): IPublicKey {
    return this.getPublicKeyInfo(this.asn.tbsCertificate.subjectPublicKeyInfo);
  }

  public get signature(): ISignature {
    const { signatureValue, signatureAlgorithm } = this.asn;
    let params;

    if (signatureAlgorithm.algorithm === id_alg_composite) {
      const compositeSignatureValues = AsnConvert.parse(signatureValue, CompositeSignatureValue);
      const compositeParams = AsnConvert.parse(signatureAlgorithm.parameters, CompositeParams);

      params = compositeParams.map((param, index) => ({
        ...param,
        value: compositeSignatureValues[index],
      }));
    }

    return {
      params,
      value: signatureValue,
      algorithm: signatureAlgorithm.algorithm,
    };
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

  public get issuerCommonName(): string {
    if (!this.issuer) {
      return '';
    }

    for (let i = 0; i < this.issuer.length; i += 1) {
      const name = this.issuer[i];

      if (name.shortName === 'CN') {
        return name.value;
      }

      if (name.shortName === 'E') {
        return name.value;
      }
    }

    return '';
  }

  public get isRoot(): boolean {
    return JSON.stringify(this.issuer) === JSON.stringify(this.subject);
  }

  public subjectToString() {
    if (!this.subject) {
      return '';
    }

    return this.subject
      .map((name) => (
        `${name.shortName}=${name.value}`
      ))
      .join(', ');
  }

  public issuerToString() {
    if (!this.issuer) {
      return '';
    }

    return this.issuer
      .map((name) => (
        `${name.shortName}=${name.value}`
      ))
      .join(', ');
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
    Download.cert.asPEM(
      this.toString('pem'),
      name || this.commonName,
    );
  }

  public downloadAsDER(name?: string) {
    Download.cert.asDER(
      this.toString('hex'),
      name || this.commonName,
    );
  }
}
