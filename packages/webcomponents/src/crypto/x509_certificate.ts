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
import {
  Certificate,
  Extension as AsnExtension,
  SubjectPublicKeyInfo,
} from '@peculiar/asn1-x509';
import { Convert } from 'pvtsutils';
import {
  dateDiff, Download, getStringByOID,
} from '../utils';
import { ExtensionFactory } from './extensions';
import { Name, INameJSON } from './name';
import { AsnData } from './asn_data';
import { PemConverter } from './pem_converter';
import {
  certificateRawToBuffer,
  getCertificateThumbprint,
} from './utils';
import {
  RowsFormat,
  RenderRow,
  row,
  hexRow,
  section,
  rowGroup,
} from './rows_format';

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

  public readonly version: number;

  public thumbprints: Record<string, string> = {};

  public readonly type = 'X.509 Certificate';

  public readonly tag = PemConverter.CertificateTag;

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
      throw new Error('Cannot get \'notBefore\' value');
    }

    this.notBefore = notBefore;

    const notAfter = tbsCertificate.validity.notAfter.utcTime
      || tbsCertificate.validity.notAfter.generalTime;

    if (!notAfter) {
      throw new Error('Cannot get \'notAfter\' value');
    }

    this.notAfter = notAfter;
    this.validity = dateDiff(this.notBefore, this.notAfter);
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

      if (name.shortName === 'CN' || name.shortName === 'E' || name.shortName === 'O') {
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
    Download.cert.asPEM(
      this.toString('pem'),
      name || this.commonName,
    );
  }

  public downloadAsDER(name?: string) {
    Download.cert.asDER(
      this.raw,
      name || this.commonName,
    );
  }

  public toJSON(): RowsFormat {
    const extensionRows: RenderRow[] = this.asn.tbsCertificate.extensions.map((e) => {
      const raw = AsnConvert.serialize(e);
      const ext = ExtensionFactory.parse(raw);

      if (ext) {
        return ext.toJSON();
      }

      const asnExt = AsnConvert.parse(raw, AsnExtension);

      return rowGroup(asnExt.extnID, [[
        row('Critical', asnExt.critical ? 'Yes' : 'No'),
        hexRow('Value', Convert.ToHex(asnExt.extnValue.buffer)),
      ]]);
    });

    return {
      $rows: [
        section('Basic Information', [
          row('Type', this.type),
          hexRow('Serial Number', this.serialNumber),
          row('Version', this.version),
          row('Validity', this.validity),
          row('Not Before', this.notBefore.toISOString()),
          row('Not After', this.notAfter.toISOString()),
        ]),
        section('Subject Name', this.subject.map((n) => row(n.name, n.value))),
        section('Issuer Name', this.issuer.map((n) => row(n.name, n.value))),
        section('Public Key Info', this.getPublicKeyRows(this.publicKey)),
        section('Signature', this.getSignatureRows()),
        section('Fingerprints', Object.entries(this.thumbprints).map(([alg, val]) => row(alg, val))),
        section('Extensions', extensionRows),
      ],
    };
  }

  private getPublicKeyRows(key: IPublicKey): RenderRow[] {
    const rows: RenderRow[] = [
      row('Algorithm', getStringByOID(key.algorithm)),
      hexRow('Value', Convert.ToHex(key.value)),
    ];

    const publicKeyParamsRows = this.serializePublicKeyParamsToRows(key.params);

    if (publicKeyParamsRows?.length) {
      rows.push(rowGroup('Params', [publicKeyParamsRows]));
    }

    return rows;
  }

  private serializePublicKeyParamsToRows(
    params: ECParameters | RSAPublicKey | IPublicKey[],
  ): RenderRow[] {
    if (Array.isArray(params)) {
      return params.map((param) => rowGroup(
        'Key',
        [this.getPublicKeyRows(param)],
      ));
    }

    if (params instanceof ECParameters) {
      return [row('Named Curve', getStringByOID(params.namedCurve))];
    }

    if (params instanceof RSAPublicKey) {
      let length = params.modulus.byteLength;

      if (length % 2) {
        length -= 1;
      }

      return [
        row('Modulus', `${length * 8} bits`),
        row('Public Exponent', params.publicExponent.byteLength === 3 ? 65537 : 3),
      ];
    }

    return [];
  }

  private getSignatureRows(): RenderRow[] {
    const {
      algorithm, value, params,
    } = this.signature;
    const rows: RenderRow[] = [
      row('Algorithm', getStringByOID(algorithm)),
      row('Value', Convert.ToHex(value)),
    ];

    if (params?.length) {
      rows.push(rowGroup('Params', [params.map((param) => rowGroup(param.algorithm, [[
        row('Algorithm', param.algorithm),
        row('Value', Convert.ToHex(param.value)),
      ]]))]));
    }

    return rows;
  }
}
