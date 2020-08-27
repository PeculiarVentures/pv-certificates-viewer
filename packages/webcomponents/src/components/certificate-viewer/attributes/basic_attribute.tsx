/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';

import { getStringByOID } from '../get_string_by_oid';
import { RowValue } from '../row';
import type { Attribute, TAttributeValue } from '../../../crypto/attribute';

interface IBasicAttributeProps {
  attribute: Attribute<TAttributeValue>;
}

export const BasicAttribute: FunctionalComponent<IBasicAttributeProps> = (props, children) => {
  const { attribute } = props;

  return ([
    <RowValue
      name="Name"
      value={getStringByOID(attribute.asn.type)}
    />,
    children,
    <tr>
      <td colSpan={2} class="divider">
        <span class="bg_fill" />
      </td>
    </tr>,
  ]);
};
