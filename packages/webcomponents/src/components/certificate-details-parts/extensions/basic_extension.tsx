/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';

import { Extension, TExtensionValue } from '../../../crypto/extension';
import { l10n, getStringByOID } from '../../../utils';
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
      value={extension.asn.critical ? l10n.getString('yes') : l10n.getString('no')}
    />,
    children,
    <tr>
      <td colSpan={2} class="divider">
        <span class="bg_fill" />
      </td>
    </tr>,
  ]);
};
