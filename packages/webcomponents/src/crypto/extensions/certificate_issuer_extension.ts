/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CertificateIssuer, id_ce_certificateIssuer } from '@peculiar/asn1-x509';
import { AsnParser } from '@peculiar/asn1-schema';
import { ExtensionFactory } from './extension_factory';
import { GeneralNameParser } from './general_name_parser';
import { BaseExtension } from './base_extension';
import { row, rowGroup, objectToRows } from '../rows_format';
import type { RenderRow } from '../rows_format';

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
    const issuerRows: RenderRow[] = this.value.flatMap((generalName) => {
      const obj = GeneralNameParser.toObject(generalName);

      if (Object.keys(obj).length === 1) {
        const [[k, v]] = Object.entries(obj);

        if (typeof v === 'string' || typeof v === 'number') {
          return [row(k, v)];
        }
      }

      return [rowGroup('Issuer', [objectToRows(obj as Record<string, unknown>)])];
    });

    return rowGroup(this.name, [[
      row('Critical', this.critical),
      ...issuerRows,
    ]]);
  }
}

ExtensionFactory.register(id_ce_certificateIssuer, CertificateIssuerExtension);
