/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { TNAuthorizationList, id_pe_TNAuthList } from '@peculiar/asn1-rfc8226';
import { AsnParser } from '@peculiar/asn1-schema';
import { ExtensionFactory } from './extension_factory';
import { BaseExtension } from './base_extension';
import { row, rowGroup } from '../rows_format';

/**
 * TN Authorization List Extension
 */
export class TNAuthorizationListExtension extends BaseExtension {
  public readonly value: TNAuthorizationList;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<TNAuthorizationList>(asnExtnValue, TNAuthorizationList);
  }

  public override toJSON() {
    const entryRows = this.value.map((entry) => {
      const rows = [row('SPC', entry.spc)];

      if (entry.range) {
        rows.push(row('Range', `start=${entry.range.start} count=${entry.range.count}`));
      }
      if (entry.one !== undefined) {
        rows.push(row('One', entry.one));
      }

      return rowGroup('Entry', [rows]);
    });

    return rowGroup(this.name, [[
      row('Critical', this.critical),
      ...entryRows,
    ]]);
  }
}

ExtensionFactory.register(id_pe_TNAuthList, TNAuthorizationListExtension);
