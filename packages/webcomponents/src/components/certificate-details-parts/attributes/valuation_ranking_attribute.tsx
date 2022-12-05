/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import type { ValuationRanking } from '@peculiar/asn1-ntqwac';

import type { Attribute } from '../../../crypto/attribute';
import { RowValue } from '../row';
import { BasicAttribute } from './basic_attribute';

interface IValuationRankingAttributeProps {
  attribute: Attribute<ValuationRanking>;
}

const getValueRank = (value: number): string => {
  let ratio = 1;

  if (value / 100 > 1) {
    ratio = 100;
  } else if (value / 10 > 1) {
    ratio = 10;
  }

  return `${value}/${5 * ratio}`;
};

export const ValuationRankingAttribute:
FunctionalComponent<IValuationRankingAttributeProps> = (props) => {
  const { attribute } = props;
  const values = Object.keys(attribute.value).map((keyName) => ([
    getValueRank(attribute.value[keyName]),
    <br />,
  ]));

  return (
    <BasicAttribute
      attribute={attribute}
    >
      <RowValue
        name="Value"
        value={values as any}
      />
    </BasicAttribute>
  );
};
