/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import { ExtendedKeyUsage } from '@peculiar/asn1-x509';

import { RowValue } from '../row';
import { Extension } from '../../../crypto/extension';
import { getStringByOID } from '../get_string_by_oid';

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
      {extension.value.map((usage, index) => (
        <RowValue
          name={`Purpose #${index + 1}`}
          value={getStringByOID(usage)}
        />
      ))}
    </BasicExtension>
  );
};
