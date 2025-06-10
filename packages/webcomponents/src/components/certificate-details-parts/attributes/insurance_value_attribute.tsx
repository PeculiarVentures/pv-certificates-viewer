/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import type { InsuranceValue } from '@peculiar/asn1-ntqwac';
import type { Attribute } from '../../../crypto/attribute';
import { RowValue } from '../row';
import { BasicAttribute } from './basic_attribute';

interface IInsuranceValueAttributeProps {
  attribute: Attribute<InsuranceValue>;
}

export const InsuranceValueAttribute:
FunctionalComponent<IInsuranceValueAttributeProps> = (props) => {
  const { attribute } = props;
  const value = `${attribute.value.base} * 10^${attribute.value.degree} ${attribute.value.location}`;

  return (
    <BasicAttribute
      attribute={attribute}
    >
      <RowValue
        name="Value"
        value={value}
      />
    </BasicAttribute>
  );
};
