/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import { BasicConstraints } from '@peculiar/asn1-x509';

import { RowValue } from '../row';
import { Extension } from '../../../crypto/extension';

import { BasicExtension } from './basic_extension';

interface IBasicConstraintsExtensionProps {
  extension: Extension<BasicConstraints>;
}

export const BasicConstraintsExtension:
FunctionalComponent<IBasicConstraintsExtensionProps> = (props) => {
  const { extension } = props;

  return (
    <BasicExtension
      extension={extension}
    >
      <RowValue
        name="Certificate Authority"
        value={extension.value.cA ? 'YES' : 'NO'}
      />
      <RowValue
        name="Path Length Constraint"
        value={extension.value.pathLenConstraint}
      />
    </BasicExtension>
  );
};
