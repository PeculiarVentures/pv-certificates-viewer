/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { InvalidityDate, id_ce_invalidityDate } from '@peculiar/asn1-x509';
import { AsnParser } from '@peculiar/asn1-schema';
import { ExtensionFactory } from './extension_factory';
import { BaseExtension } from './base_extension';
import { row, rowGroup } from '../rows_format';

/**
 * Invalidity Date Extension
 */
export class InvalidityDateExtension extends BaseExtension {
  public readonly value: InvalidityDate;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<InvalidityDate>(asnExtnValue, InvalidityDate);
  }

  public override toJSON() {
    return rowGroup(this.name, [[
      row('Critical', this.critical),
      row('Date', this.value.value.toISOString()),
    ]]);
  }
}

ExtensionFactory.register(id_ce_invalidityDate, InvalidityDateExtension);
