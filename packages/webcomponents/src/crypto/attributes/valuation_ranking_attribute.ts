/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ValuationRanking } from '@peculiar/asn1-ntqwac';
import { AsnParser } from '@peculiar/asn1-schema';
import { BaseAttribute } from './base_attribute';

/**
 * Valuation Ranking Attribute
 */
export class ValuationRankingAttribute extends BaseAttribute {
  public static override readonly NAME = 'Valuation Ranking';

  public readonly value: ValuationRanking;

  constructor(raw: BufferSource) {
    super(raw);

    const asnAttrValue = this.asn.values[0];

    this.value = AsnParser.parse<ValuationRanking>(asnAttrValue, ValuationRanking);
  }

  public override toJSON(): Record<string, string | number | boolean | Record<string, string | number | boolean>[]> {
    const result: Record<string, string | number> = { Name: ValuationRankingAttribute.NAME };

    Object.keys(this.value).forEach((keyName) => {
      const value = this.value[keyName];
      let ratio = 1;

      if (value / 100 > 1) {
        ratio = 100;
      } else if (value / 10 > 1) {
        ratio = 10;
      }

      result[keyName] = `${value}/${5 * ratio}`;
    });

    return result;
  }
}
