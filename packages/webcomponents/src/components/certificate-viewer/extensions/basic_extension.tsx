/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';

import { Extension, TExtensionValue } from '../../../crypto/extension';
import { getStringByOID } from '../get_string_by_oid';
import { RowValue } from '../row';

interface IBasicExtensionProps {
  extension: Extension<TExtensionValue>;
}

export const BasicExtension: FunctionalComponent<IBasicExtensionProps> = (props, children) => {
  const { extension } = props;

  return ([
    <RowValue
      name="Name"
      value={getStringByOID(extension.asn.extnID)}
    />,
    <RowValue
      name="Critical"
      value={extension.asn.critical ? 'YES' : 'NO'}
    />,
    children,
    <tr>
      <td colSpan={2} class="divider">
        <span class="bg_fill" />
      </td>
    </tr>,
  ]);
};
