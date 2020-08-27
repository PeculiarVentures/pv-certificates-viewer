/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';

import { RowValue } from '../row';
import { Extension } from '../../../crypto/extension';

import { BasicExtension } from './basic_extension';

interface IAsStringExtensionProps {
  extension: Extension<string>;
}

export const AsStringExtension: FunctionalComponent<IAsStringExtensionProps> = (props) => {
  const { extension } = props;

  return (
    <BasicExtension
      extension={extension}
    >
      <RowValue
        name="Value"
        value={extension.value}
        monospace
      />
    </BasicExtension>
  );
};
