/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { SubjectDirectoryAttributes, Attribute, id_ce_subjectDirectoryAttributes } from '@peculiar/asn1-x509';
import { AsnParser } from '@peculiar/asn1-schema';
import { Convert } from 'pvtsutils';
import { ExtensionFactory } from './extension_factory';
import { BaseExtension } from './base_extension';
import { row, rowGroup } from '../rows_format';

/**
 * Subject Directory Attributes Extension
 */
export class SubjectDirectoryAttributesExtension extends BaseExtension {
  public readonly value: SubjectDirectoryAttributes;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<SubjectDirectoryAttributes>(asnExtnValue, SubjectDirectoryAttributes);
  }

  public override toJSON() {
    const attrRows = this.value.map((attribute: Attribute) => rowGroup('Attribute', [[
      row('Type', attribute.type),
      row('Value', Convert.ToString(attribute.values[0])),
    ]]));

    return rowGroup(this.name, [[
      row('Critical', this.critical),
      ...attrRows,
    ]]);
  }
}

ExtensionFactory.register(id_ce_subjectDirectoryAttributes, SubjectDirectoryAttributesExtension);
