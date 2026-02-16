/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { InsuranceValue } from '@peculiar/asn1-ntqwac';
import { AsnParser } from '@peculiar/asn1-schema';
import { BaseAttribute } from './base_attribute';

/**
 * Insurance Value Attribute
 */
export class InsuranceValueAttribute extends BaseAttribute {
  public static override readonly NAME = 'Insurance Value';

  public readonly value: InsuranceValue;

  constructor(raw: BufferSource) {
    super(raw);

    const asnAttrValue = this.asn.values[0];

    this.value = AsnParser.parse<InsuranceValue>(asnAttrValue, InsuranceValue);
  }

  public override toJSON(): Record<string, string | number | boolean> {
    return {
      Name: InsuranceValueAttribute.NAME,
      Value: `${this.value.base} * 10^${this.value.degree} ${this.value.location}`,
    };
  }
}
