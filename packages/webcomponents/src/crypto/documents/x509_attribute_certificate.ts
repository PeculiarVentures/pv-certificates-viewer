/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AttributeCertificate } from '@peculiar/asn1-x509-attr';
import { hex } from '@peculiar/utils/encoding';
import { dateDiff, Download } from '../../utils';
import { type IParsedAttribute, parseAttribute } from '../attributes';
import { PemConverter } from '../encoding/pem_converter';
import { certificateRawToBuffer } from '../encoding/raw';
import { type IParsedExtension, parseExtension, type IExtensionNode } from '../extensions';
import { parseHolder } from '../fields/holder';
import { parseIssuer } from '../fields/issuer';
import { type ISignatureJSON, parseSignature, signatureToJSON } from '../fields/signature';
import { AsnDocument } from './asn_document';

interface ISignature {
  algorithm: string;
  value: BufferSource;
}

export interface IAttributeCertificateJSON {
  type: string;
  /** Human version (`2` for v2). */
  version: number;
  serialNumber: string;
  issuer: IExtensionNode[];
  holder: IExtensionNode[];
  notBefore: Date;
  notAfter: Date;
  validity: string;
  signature: ISignatureJSON;
  extensions: IParsedExtension[];
  attributes: IParsedAttribute[];
}

export class X509AttributeCertificate extends AsnDocument<
  AttributeCertificate,
  IAttributeCertificateJSON
> {
  public readonly serialNumber: string;

  public readonly version: number;

  public readonly notBefore: Date;

  public readonly notAfter: Date;

  public readonly validity: string;

  /** @deprecated Use `toJSON().extensions`. Filled by `parseExtensions()`. */
  public extensions: IParsedExtension[];

  /** @deprecated Use `toJSON().attributes`. Filled by `parseAttributes()`. */
  public attributes: IParsedAttribute[];

  public holder: IExtensionNode[];

  public readonly issuer: IExtensionNode[];

  public readonly type = 'X.509 Attribute Certificate';

  public readonly tag = PemConverter.AttributeCertificateTag;

  constructor(raw: string) {
    super(certificateRawToBuffer(raw), AttributeCertificate);

    const { acinfo } = this.asn;

    this.serialNumber = hex.encode(acinfo.serialNumber);
    this.version = acinfo.version;

    const notBefore = acinfo.attrCertValidityPeriod.notBeforeTime;

    if (!notBefore) {
      throw new Error("Cannot get 'notBefore' value");
    }

    this.notBefore = notBefore;

    const notAfter = acinfo.attrCertValidityPeriod.notAfterTime;

    if (!notAfter) {
      throw new Error("Cannot get 'notAfter' value");
    }

    this.notAfter = notAfter;
    this.validity = dateDiff(this.notBefore, this.notAfter);
    this.issuer = parseIssuer(acinfo.issuer);
    this.holder = parseHolder(acinfo.holder);
  }

  protected buildJSON(): IAttributeCertificateJSON {
    const { acinfo } = this.asn;

    return {
      type: this.type,
      version: this.version + 1,
      serialNumber: this.serialNumber,
      issuer: this.issuer,
      holder: this.holder,
      notBefore: this.notBefore,
      notAfter: this.notAfter,
      validity: this.validity,
      signature: signatureToJSON(
        parseSignature(this.asn.signatureAlgorithm, this.asn.signatureValue),
      ),
      extensions: (acinfo.extensions ?? []).map(parseExtension),
      attributes: (acinfo.attributes ?? []).map(parseAttribute),
    };
  }

  protected downloader() {
    return Download.attrCert;
  }

  /** @deprecated Use `toJSON().signature`. */
  public get signature(): ISignature {
    const { signatureValue, signatureAlgorithm } = this.asn;

    return {
      value: signatureValue,
      algorithm: signatureAlgorithm.algorithm,
    };
  }

  /** @deprecated Use `toJSON().extensions`. */
  public parseExtensions() {
    if (this.asn.acinfo.extensions) {
      this.extensions = this.toJSON().extensions;
    }
  }

  /** @deprecated Use `toJSON().attributes`. */
  public parseAttributes() {
    if (this.asn.acinfo.attributes) {
      this.attributes = this.toJSON().attributes;
    }
  }

  public get commonName(): string {
    // Thumbprints are computed asynchronously; before that, the serial number still gives a unique name.
    return `attribute-certificate-${this.thumbprints['SHA-1'] ?? this.serialNumber}`;
  }
}
