/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AsnParser } from '@peculiar/asn1-schema';
import { Attribute as AsnAttribute } from '@peculiar/asn1-x509';
import { id_ValuationRanking, ValuationRanking } from '@peculiar/asn1-ntqwac';
import type { IAttributeParser, IParsedAttribute } from '../types';
import { node } from '../../extension-parsers/builders';

function formatRank(value: number): string {
  let ratio = 1;

  if (value / 100 > 1) ratio = 100;
  else if (value / 10 > 1) ratio = 10;

  return `${value}/${5 * ratio}`;
}

export class ValuationRankingParser implements IAttributeParser {
  readonly oids = [id_ValuationRanking];

  parse(attribute: AsnAttribute): IParsedAttribute {
    const vr = AsnParser.parse(attribute.values[0], ValuationRanking);

    const children = (Object.keys(vr) as (keyof ValuationRanking)[])
      .filter((k) => vr[k] != null)
      .map((k) => node(String(k), formatRank(Number(vr[k]))));

    return {
      oid: attribute.type, children,
    };
  }
}
