/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LeiChoice, id_lei } from '@peculiar/asn1-lei';
import { AsnParser } from '@peculiar/asn1-schema';
import { row, rowGroup } from '../rows_format';
import { ExtensionFactory } from './extension_factory';
import { BaseExtension } from './base_extension';

/**
 * Legal Entity Identifier (LEI) Choice Extension
 */
export class LeiChoiceExtension extends BaseExtension {
  public readonly value: LeiChoice;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<LeiChoice>(asnExtnValue, LeiChoice);
  }

  public override toJSON() {
    return rowGroup(this.name, [[
      row('Critical', this.critical),
      row('Identifier', this.value.text),
    ]]);
  }
}

ExtensionFactory.register(id_lei, LeiChoiceExtension);
