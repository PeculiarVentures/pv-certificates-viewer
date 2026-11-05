/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CertificateList, Time } from '@peculiar/asn1-x509';
import { Download } from '../../utils';
import { PemConverter } from '../encoding/pem_converter';
import { certificateRawToBuffer } from '../encoding/raw';
import { type IParsedExtension, parseExtension } from '../extensions';
import { Name, INameJSON, firstCommonName } from '../fields/name';
import { type ISignatureJSON, parseSignature, signatureToJSON } from '../fields/signature';
import { AsnDocument } from './asn_document';

interface ISignature {
  algorithm: string;
  value: BufferSource;
}

export interface IRevokedCertificate {
  userCertificate: ArrayBuffer;
  revocationDate: Time;
  crlEntryExtensions?: IParsedExtension[];
}

export interface ICrlJSON {
  type: string;
  /** Human version (`2` for v2); undefined when the optional field is absent. */
  version?: number;
  issuer: INameJSON[];
  lastUpdate: Date;
  nextUpdate?: Date;
  signature: ISignatureJSON;
  extensions: IParsedExtension[];
  revokedCertificates: IRevokedCertificate[];
}

export class X509Crl extends AsnDocument<CertificateList, ICrlJSON> {
  public readonly issuer: INameJSON[];

  public readonly version: number;

  public readonly lastUpdate: Date;

  public readonly nextUpdate: Date;

  /** @deprecated Use `toJSON().extensions`. Filled by `parseExtensions()`. */
  public extensions: IParsedExtension[];

  public revokedCertificates: IRevokedCertificate[];

  public readonly type = 'X.509 Certificate Revocation List';

  public readonly tag = PemConverter.CrlTag;

  constructor(raw: string) {
    super(certificateRawToBuffer(raw), CertificateList);

    const { tbsCertList } = this.asn;

    this.issuer = Name.parse(tbsCertList.issuer);
    this.version = (tbsCertList.version ?? 1) + 1;
    this.lastUpdate = tbsCertList.thisUpdate.getTime();
    this.nextUpdate = tbsCertList.nextUpdate?.getTime() ?? this.lastUpdate;

    this.revokedCertificates = (tbsCertList.revokedCertificates || []).map(
      (revokedCertificate) => ({
        revocationDate: revokedCertificate.revocationDate,
        userCertificate: revokedCertificate.userCertificate,
        crlEntryExtensions: revokedCertificate.crlEntryExtensions?.map(parseExtension),
      }),
    );
  }

  protected buildJSON(): ICrlJSON {
    const { tbsCertList } = this.asn;

    return {
      type: this.type,
      version: tbsCertList.version === undefined ? undefined : tbsCertList.version + 1,
      issuer: this.issuer,
      lastUpdate: this.lastUpdate,
      nextUpdate: tbsCertList.nextUpdate?.getTime(),
      signature: signatureToJSON(parseSignature(this.asn.signatureAlgorithm, this.asn.signature)),
      extensions: (tbsCertList.crlExtensions ?? []).map(parseExtension),
      revokedCertificates: this.revokedCertificates,
    };
  }

  protected downloader() {
    return Download.crl;
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
    return firstCommonName(this.issuer);
  }

  /** @deprecated Use `toJSON().extensions`. */
  public parseExtensions() {
    if (this.asn.tbsCertList.crlExtensions) {
      this.extensions = this.toJSON().extensions;
    }
  }
}
