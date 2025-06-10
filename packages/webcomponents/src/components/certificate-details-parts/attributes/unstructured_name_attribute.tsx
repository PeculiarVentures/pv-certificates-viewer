/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import type { UnstructuredName } from '@peculiar/asn1-pkcs9';
import type { Attribute } from '../../../crypto/attribute';
import { RowValue } from '../row';
import { BasicAttribute } from './basic_attribute';

interface IUnstructuredNameAttributeProps {
  attribute: Attribute<UnstructuredName>;
}

export const UnstructuredNameAttribute:
FunctionalComponent<IUnstructuredNameAttributeProps> = (props) => {
  const { attribute } = props;

  return (
    <BasicAttribute
      attribute={attribute}
    >
      <RowValue
        name="Value"
        value={attribute.value.utf8String}
      />
    </BasicAttribute>
  );
};
