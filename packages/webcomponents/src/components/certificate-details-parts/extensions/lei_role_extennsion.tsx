/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import { LeiRole } from '@peculiar/asn1-lei';
import { RowValue } from '../row';
import { Extension } from '../../../crypto/extension';
import { BasicExtension } from './basic_extension';

interface ILeiRoleExtensionProps {
  extension: Extension<LeiRole>;
}

export const LeiRoleExtension: FunctionalComponent<ILeiRoleExtensionProps> = (props) => {
  const { extension } = props;

  return (
    <BasicExtension
      extension={extension}
    >
      <RowValue
        name="Role"
        value={extension.value.text}
      />
    </BasicExtension>
  );
};
