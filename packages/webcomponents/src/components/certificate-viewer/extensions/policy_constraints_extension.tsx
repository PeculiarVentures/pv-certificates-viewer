/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import { PolicyConstraints } from '@peculiar/asn1-x509';
import { AsnIntegerArrayBufferConverter } from '@peculiar/asn1-schema';

import { RowValue } from '../row';
import { Extension } from '../../../crypto/extension';

import { BasicExtension } from './basic_extension';

interface IPolicyConstraintsExtensionProps {
  extension: Extension<PolicyConstraints>;
}

export const PolicyConstraintsExtension:
FunctionalComponent<IPolicyConstraintsExtensionProps> = (props) => {
  const { extension } = props;

  return (
    <BasicExtension
      extension={extension}
    >
      {extension.value.requireExplicitPolicy && (
        <RowValue
          name="Require Explicit Policy"
          value={AsnIntegerArrayBufferConverter.toASN(
            extension.value.requireExplicitPolicy,
          ).valueBlock.toString()}
        />
      )}
      {extension.value.inhibitPolicyMapping && (
        <RowValue
          name="Inhibit Policy Mapping"
          value={AsnIntegerArrayBufferConverter.toASN(
            extension.value.inhibitPolicyMapping,
          ).valueBlock.toString()}
        />
      )}
    </BasicExtension>
  );
};
