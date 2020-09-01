/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';

import { BasicAttribute } from './basic_attribute';
import type { Attribute } from '../../../crypto/attribute';
import { RowValue } from '../row';

interface IAsStringAttributeProps {
  attribute: Attribute<string>;
}

export const AsStringAttribute:
FunctionalComponent<IAsStringAttributeProps> = (props) => {
  const { attribute } = props;

  return (
    <BasicAttribute
      attribute={attribute}
    >
      <RowValue
        name="Value"
        value={attribute.value}
        monospace
      />
    </BasicAttribute>
  );
};
