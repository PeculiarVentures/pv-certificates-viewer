/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import { ExtendedKeyUsage } from '@peculiar/asn1-x509';
import { getStringByOID } from '../../../utils';
import { Extension } from '../../../crypto/extension';
import { RowValue, TableRowTable } from '../row';
import { BasicExtension } from './basic_extension';

interface IExtendedKeyUsageExtensionProps {
  extension: Extension<ExtendedKeyUsage>;
}

export const ExtendedKeyUsageExtension:
FunctionalComponent<IExtendedKeyUsageExtensionProps> = (props) => {
  const { extension } = props;

  return (
    <BasicExtension
      extension={extension}
    >
      {Boolean(extension.value.length) && ([
        <RowValue
          name="Purposes"
          value=""
        />,
        extension.value.map((usage) => (
          <TableRowTable>
            <RowValue
              name="Purpose"
              value={getStringByOID(usage)}
            />
          </TableRowTable>
        )),
      ])}
    </BasicExtension>
  );
};
