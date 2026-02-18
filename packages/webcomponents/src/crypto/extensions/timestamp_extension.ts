/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Timestamp, id_adbe_timestamp } from '@peculiar/asn1-adobe-acrobat';
import { AsnParser } from '@peculiar/asn1-schema';
import {
  row, rowGroup, objectToRows,
} from '../rows_format';
import { ExtensionFactory } from './extension_factory';
import { BaseExtension } from './base_extension';
import { GeneralNameParser } from './general_name_parser';

/**
 * Timestamp Extension
 */
export class TimestampExtension extends BaseExtension {
  public readonly value: Timestamp;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<Timestamp>(asnExtnValue, Timestamp);
  }

  public override toJSON() {
    const rows = [
      row('Critical', this.critical),
      row('Version', this.value.version),
      row('Requires Auth', this.value.requiresAuth ? 'Yes' : 'No'),
      ...(this.value.location ? objectToRows(GeneralNameParser.toObject(this.value.location) as Record<string, unknown>) : []),
    ];

    return rowGroup(this.name, [rows]);
  }
}

ExtensionFactory.register(id_adbe_timestamp, TimestampExtension);
