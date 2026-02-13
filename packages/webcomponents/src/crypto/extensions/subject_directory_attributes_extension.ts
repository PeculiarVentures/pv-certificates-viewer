/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { SubjectDirectoryAttributes, Attribute } from '@peculiar/asn1-x509';
import { AsnParser } from '@peculiar/asn1-schema';
import { Convert } from 'pvtsutils';
import { BaseExtension } from './base_extension';

/**
 * Subject Directory Attributes Extension
 */
export class SubjectDirectoryAttributesExtension extends BaseExtension {
  public static override readonly NAME = 'Subject Directory Attributes';

  public readonly value: SubjectDirectoryAttributes;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<SubjectDirectoryAttributes>(asnExtnValue, SubjectDirectoryAttributes);
  }

  public override toJSON(): Record<string, string | number | boolean | Record<string, string | number | boolean>[]> {
    const attributes = this.value.map((attribute: Attribute) => ({
      Type: attribute.type,
      Value: Convert.ToString(attribute.values[0]),
    }));

    return {
      Name: SubjectDirectoryAttributesExtension.NAME,
      Critical: this.critical ? 'Yes' : 'No',
      Attributes: attributes,
    };
  }
}
