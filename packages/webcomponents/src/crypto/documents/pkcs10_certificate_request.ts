/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CertificationRequest } from '@peculiar/asn1-csr';
import { Download } from '../../utils';
import { type IParsedAttribute, parseAttribute } from '../attributes';
import { PemConverter } from '../encoding/pem_converter';
import { certificateRawToBuffer } from '../encoding/raw';
import { Name, INameJSON, firstCommonName } from '../fields/name';
import {
  type IPublicKey,
  type IPublicKeyJSON,
  parsePublicKeyInfo,
  publicKeyToJSON,
} from '../fields/public_key';
import { type ISignatureJSON, parseSignature, signatureToJSON } from '../fields/signature';
import { AsnDocument } from './asn_document';

interface ISignature {
  algorithm: string;
  value: BufferSource;
}

export interface ICsrJSON {
  type: string;
  /** Human version (`1` for v1). */
  version: number;
  subject: INameJSON[];
  publicKey: IPublicKeyJSON;
  signature: ISignatureJSON;
  attributes: IParsedAttribute[];
}

export class Pkcs10CertificateRequest extends AsnDocument<CertificationRequest, ICsrJSON> {
  public readonly subject: INameJSON[];

  public readonly version: number;

  /** @deprecated Use `toJSON().attributes`. Filled by `parseAttributes()`. */
  public attributes: IParsedAttribute[];

  public readonly type = 'PKCS#10 Certificate Request';

  public readonly tag = PemConverter.CertificateRequestTag;

  constructor(raw: string) {
    super(certificateRawToBuffer(raw), CertificationRequest);

    const { certificationRequestInfo } = this.asn;

    this.subject = Name.parse(certificationRequestInfo.subject);
    this.version = certificationRequestInfo.version;
  }

  protected buildJSON(): ICsrJSON {
    const { certificationRequestInfo } = this.asn;

    return {
      type: this.type,
      version: this.version + 1,
      subject: this.subject,
      publicKey: publicKeyToJSON(this.publicKey),
      signature: signatureToJSON(parseSignature(this.asn.signatureAlgorithm, this.asn.signature)),
      attributes: (certificationRequestInfo.attributes ?? []).map(parseAttribute),
    };
  }

  protected downloader() {
    return Download.csr;
  }

  /** @deprecated Use `toJSON().publicKey`. */
  public get publicKey(): IPublicKey {
    return parsePublicKeyInfo(this.asn.certificationRequestInfo.subjectPKInfo);
  }

  /** @deprecated Use `toJSON().signature`. */
  public get signature(): ISignature {
    const { signature, signatureAlgorithm } = this.asn;

    return {
      value: signature,
      algorithm: signatureAlgorithm.algorithm,
    };
  }

  public get commonName(): string {
    return firstCommonName(this.subject);
  }

  /** @deprecated Use `toJSON().attributes`. */
  public parseAttributes() {
    if (this.asn.certificationRequestInfo.attributes) {
      this.attributes = this.toJSON().attributes;
    }
  }
}
