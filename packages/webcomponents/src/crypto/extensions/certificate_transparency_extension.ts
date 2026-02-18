/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CertificateTransparency, id_certificateTransparency } from '@peculiar/asn1-cert-transparency';
import { AsnParser } from '@peculiar/asn1-schema';
import { row, rowGroup } from '../rows_format';
import logs from '../../constants/logs';
import { ExtensionFactory } from './extension_factory';
import { BaseExtension } from './base_extension';

/**
 * Certificate Transparency Extension
 */
export class CertificateTransparencyExtension extends BaseExtension {
  public readonly value: CertificateTransparency;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<CertificateTransparency>(asnExtnValue, CertificateTransparency);
  }

  public override toJSON() {
    const sctRows = this.value.toJSON().map((sct) => {
      const rows = [
        row('Version', sct.version + 1),
        row('Log Key ID', sct.logId),
        row('Timestamp', new Date(sct.timestamp).toUTCString()),
        row('Signature Algorithm', `${sct.hashAlgorithm} ${sct.signatureAlgorithm}`.toUpperCase()),
        row('Signature', sct.signature),
      ];

      if (logs[sct.logId]) rows.splice(2, 0, row('Log Operator', logs[sct.logId]));
      if (sct.extensions) rows.push(row('Extensions', typeof sct.extensions === 'string' ? sct.extensions : JSON.stringify(sct.extensions)));

      return rows;
    });

    return rowGroup(this.name, [[
      row('Critical', this.critical),
      rowGroup('Signed Certificate Timestamps', sctRows),
    ]]);
  }
}

ExtensionFactory.register(id_certificateTransparency, CertificateTransparencyExtension);
