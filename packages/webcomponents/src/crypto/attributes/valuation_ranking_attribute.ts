/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ValuationRanking, id_ValuationRanking } from '@peculiar/asn1-ntqwac';
import { AsnParser } from '@peculiar/asn1-schema';
import { AttributeFactory } from './attribute_factory';
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

  public override toJSON() {
    const content: string[] = Object.keys(this.value).map((keyName) => {
      const value = this.value[keyName];
      let ratio = 1;

      if (value / 100 > 1) {
        ratio = 100;
      } else if (value / 10 > 1) {
        ratio = 10;
      }

      return `${value}/${5 * ratio}`;
    });

    return this.attrJson({ Value: content.join(', ') });
  }
}

AttributeFactory.register(id_ValuationRanking, ValuationRankingAttribute);
