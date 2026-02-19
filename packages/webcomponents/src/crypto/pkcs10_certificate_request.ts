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
import { Download, getStringByOID } from '../utils';
import type {
  TJsonRenderFormat,
  TJsonRenderValue,
  IJsonRenderObject,
} from '../components/certificate-details-parts/json_to_html_parser';
import { ArrayFlat } from '../components/certificate-details-parts/json_to_html_parser';
import { AttributeFactory } from './attributes';
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

interface IPublicKey {
  algorithm: string;
  value: BufferSource;
  params?: ECParameters | RSAPublicKey;
}

export class Pkcs10CertificateRequest extends AsnData<CertificationRequest> {
  public readonly subject: INameJSON[];

  public readonly version: number;

  public thumbprints: Record<string, string> = {};

  public readonly type = 'PKCS#10 Certificate Request';

  public readonly tag = PemConverter.CertificateRequestTag;

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
    Download.csr.asPEM(
      this.toString('pem'),
      name || this.commonName,
    );
  }

  public downloadAsDER(name?: string) {
    Download.csr.asDER(
      this.raw,
      name || this.commonName,
    );
  }

  public toJSON(): TJsonRenderFormat {
    const attributeItems: TJsonRenderValue[] = this.asn.certificationRequestInfo.attributes?.map((attr) => (
      AttributeFactory.toJSON(AsnConvert.serialize(attr))
    )) || [];

    return {
      'Basic Information': {
        Type: this.type,
        Version: this.version,
      },
      'Subject Name': new ArrayFlat(...this.subject.map((n) => ({ [n.name]: n.value }))),
      'Public Key Info': this.getPublicKeyJson(this.publicKey),
      Signature: this.getSignatureJson(),
      Fingerprints: this.thumbprints,
      ...(attributeItems.length > 0 && { Attributes: ArrayFlat.from(attributeItems) }),
    };
  }

  private getPublicKeyJson(key: IPublicKey): IJsonRenderObject {
    const out: IJsonRenderObject = {
      Algorithm: getStringByOID(key.algorithm),
      Value: Convert.ToHex(key.value),
    };

    if (key.params instanceof ECParameters) {
      out.Params = { 'Named Curve': getStringByOID(key.params.namedCurve) };
    } else if (key.params instanceof RSAPublicKey) {
      let length = key.params.modulus.byteLength;

      if (length % 2) length -= 1;
      out.Params = {
        Modulus: `${length * 8} bits`,
        'Public Exponent': key.params.publicExponent.byteLength === 3 ? 65537 : 3,
      };
    }

    return out;
  }

  private getSignatureJson(): IJsonRenderObject {
    const { algorithm, value } = this.signature;

    return {
      Algorithm: getStringByOID(algorithm),
      Value: Convert.ToHex(value),
    };
  }
}
