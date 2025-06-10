/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import { KeyUsage } from '@peculiar/asn1-x509';
import { RowValue } from '../row';
import { Extension } from '../../../crypto/extension';
import { BasicExtension } from './basic_extension';

interface IKeyUsageExtensionProps {
  extension: Extension<KeyUsage>;
}

export const KeyUsageExtension: FunctionalComponent<IKeyUsageExtensionProps> = (props) => {
  const { extension } = props;

  return (
    <BasicExtension
      extension={extension}
    >
      <RowValue
        name="Usage"
        value={extension.value.toJSON().join(', ')}
      />
    </BasicExtension>
  );
};
