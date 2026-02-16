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

  public override toJSON():
  Record<string, string | number | boolean | Record<string, string | number | boolean | Record<string, string>[]>[]> {
    const extensions = this.value.map((e) => {
      const extSerialized = AsnConvert.serialize(e);
      const extension = ExtensionFactory.parse(extSerialized);

      if (extension) {
        return extension;
      }

      // Fallback: return a basic extension structure for unknown extensions
      return {
        toJSON: () => ({
          Name: e.extnID,
          Critical: e.critical ? 'Yes' : 'No',
          Value: Convert.ToHex(e.extnValue),
        }),
      };
    });

    return {
      Name: ExtensionRequestAttribute.NAME,
      Extensions: extensions.map((ext) => ext.toJSON()),
    } as Record<
      string,
      string | number | boolean | Record<string, string | number | boolean | Record<string, string>[]>[]
    >;
  }
}
