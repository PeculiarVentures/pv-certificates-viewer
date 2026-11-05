/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Certificate } from '@peculiar/asn1-x509';
import { hex } from '@peculiar/utils/encoding';
import { dateDiff, Download } from '../../utils';
import { PemConverter } from '../encoding/pem_converter';
import { certificateRawToBuffer } from '../encoding/raw';
import { type IParsedExtension, parseExtension } from '../extensions';
import { Name, INameJSON, firstCommonName, nameToString } from '../fields/name';
import {
  type IPublicKey,
  type IPublicKeyJSON,
  parsePublicKeyInfo,
  publicKeyToJSON,
} from '../fields/public_key';
import {
  type ISignature,
  type ISignatureJSON,
  parseSignature,
  signatureToJSON,
} from '../fields/signature';
import { AsnDocument } from './asn_document';

export type { IMTCProofDetails, ISignature, ISignatureJSON } from '../fields/signature';
export type { IPublicKey, IPublicKeyJSON } from '../fields/public_key';

export interface ICertificateJSON {
  type: string;
  /** Human version (`3` for v3). */
  version: number;
  serialNumber: string;
  subject: INameJSON[];
  issuer: INameJSON[];
  notBefore: Date;
  notAfter: Date;
  validity: string;
  publicKey: IPublicKeyJSON;
  signature: ISignatureJSON;
  extensions: IParsedExtension[];
  isRoot: boolean;
}

export class X509Certificate extends AsnDocument<Certificate, ICertificateJSON> {
  public readonly serialNumber: string;

  public readonly subject: INameJSON[];

  public readonly issuer: INameJSON[];

  public readonly notBefore: Date;

  public readonly notAfter: Date;

  public readonly validity: string;

  /** @deprecated Use `toJSON().extensions`. Filled by `parseExtensions()`. */
  public extensions: IParsedExtension[];

  public readonly version: number;

  public readonly type = 'X.509 Certificate';

  public readonly tag = PemConverter.CertificateTag;

  constructor(raw: string) {
    super(certificateRawToBuffer(raw), Certificate);

    const { tbsCertificate } = this.asn;

    this.serialNumber = hex.encode(tbsCertificate.serialNumber);
    this.subject = Name.parse(tbsCertificate.subject);
    this.issuer = Name.parse(tbsCertificate.issuer);
    this.version = tbsCertificate.version + 1;

    const notBefore =
      tbsCertificate.validity.notBefore.utcTime || tbsCertificate.validity.notBefore.generalTime;

    if (!notBefore) {
      throw new Error("Cannot get 'notBefore' value");
    }

    this.notBefore = notBefore;

    const notAfter =
      tbsCertificate.validity.notAfter.utcTime || tbsCertificate.validity.notAfter.generalTime;

    if (!notAfter) {
      throw new Error("Cannot get 'notAfter' value");
    }

    this.notAfter = notAfter;
    this.validity = dateDiff(this.notBefore, this.notAfter);
  }

  protected buildJSON(): ICertificateJSON {
    return {
      type: this.type,
      version: this.version,
      serialNumber: this.serialNumber,
      subject: this.subject,
      issuer: this.issuer,
      notBefore: this.notBefore,
      notAfter: this.notAfter,
      validity: this.validity,
      publicKey: publicKeyToJSON(this.publicKey),
      signature: signatureToJSON(this.signature),
      extensions: (this.asn.tbsCertificate.extensions ?? []).map(parseExtension),
      isRoot: this.isRoot,
    };
  }

  protected downloader() {
    return Download.cert;
  }

  /** @deprecated Use `toJSON().extensions`. */
  public parseExtensions() {
    if (this.asn.tbsCertificate.extensions) {
      this.extensions = this.toJSON().extensions;
    }
  }

  /** @deprecated Use `toJSON().publicKey`. */
  public get publicKey(): IPublicKey {
    return parsePublicKeyInfo(this.asn.tbsCertificate.subjectPublicKeyInfo);
  }

  /** @deprecated Use `toJSON().signature`. */
  public get signature(): ISignature {
    return parseSignature(this.asn.signatureAlgorithm, this.asn.signatureValue);
  }

  public get commonName(): string {
    return firstCommonName(this.subject);
  }

  /** @deprecated Use `firstCommonName(toJSON().issuer)`. */
  public get issuerCommonName(): string {
    return firstCommonName(this.issuer);
  }

  /** @deprecated Use `toJSON().isRoot`. */
  public get isRoot(): boolean {
    return JSON.stringify(this.issuer) === JSON.stringify(this.subject);
  }

  /** @deprecated Use `nameToString(toJSON().subject)`. */
  public subjectToString() {
    return nameToString(this.subject);
  }

  /** @deprecated Use `nameToString(toJSON().issuer)`. */
  public issuerToString() {
    return nameToString(this.issuer);
  }
}
