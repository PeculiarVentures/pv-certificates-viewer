/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CertificateIssuer, id_ce_certificateIssuer } from '@peculiar/asn1-x509';
import { AsnParser } from '@peculiar/asn1-schema';
import type { IJsonRenderObject } from '../../components/certificate-details-parts/json_to_html_parser';
import { ExtensionFactory } from './extension_factory';
import { GeneralNameParser } from './general_name_parser';
import { BaseExtension } from './base_extension';

/**
 * Certificate Issuer Extension
 */
export class CertificateIssuerExtension extends BaseExtension {
  public readonly value: CertificateIssuer;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<CertificateIssuer>(asnExtnValue, CertificateIssuer);
  }

  public override toJSON() {
    const issuers = this.value.map((generalName) => {
      const obj = GeneralNameParser.toObject(generalName) as Record<string, unknown>;

      if (Object.keys(obj).length === 1) {
        const [[k, v]] = Object.entries(obj);

        if (typeof v === 'string' || typeof v === 'number') {
          return { [k]: v };
        }
      }

      return { Issuer: obj as IJsonRenderObject };
    });

    return {
      [this.name]: {
        Critical: this.critical,
        Issuers: issuers,
      },
    };
  }
}

ExtensionFactory.register(id_ce_certificateIssuer, CertificateIssuerExtension);
