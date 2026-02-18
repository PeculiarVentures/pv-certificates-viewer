/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ExtensionRequest } from '@peculiar/asn1-pkcs9';
import { AsnParser, AsnConvert } from '@peculiar/asn1-schema';
import { Convert } from 'pvtsutils';
import { ExtensionFactory } from '../extensions';
import {
  row, hexRow, section,
} from '../rows_format';
import { BaseAttribute } from './base_attribute';

/**
 * Extension Request Attribute
 */
export class ExtensionRequestAttribute extends BaseAttribute {
  public static override readonly NAME = 'Extension Request';

  public readonly value: ExtensionRequest;

  constructor(raw: BufferSource) {
    super(raw);

    const asnAttrValue = this.asn.values[0];

    this.value = AsnParser.parse<ExtensionRequest>(asnAttrValue, ExtensionRequest);
  }

  // @ts-ignore
  public override toJSON() {
    const extensionRows = this.value.map((e) => {
      const extSerialized = AsnConvert.serialize(e);
      const extension = ExtensionFactory.parse(extSerialized);

      if (extension) {
        return extension.toJSON();
      }

      return section(e.extnID, [
        row('Critical', e.critical ? 'Yes' : 'No'),
        hexRow('Value', Convert.ToHex(e.extnValue)),
      ]);
    });

    return {
      $rows: [
        section(ExtensionRequestAttribute.NAME, [
          section('Extensions', extensionRows),
        ]),
      ],
    };
  }
}
