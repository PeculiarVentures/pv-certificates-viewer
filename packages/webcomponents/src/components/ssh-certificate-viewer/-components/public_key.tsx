/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import type { ISshKeyJSON } from '../../../crypto';
import { getStringByOID } from '../../../utils';
import { RowTitle, RowValue } from '../../_shared/details/row';

interface ISshPublicKeyProps {
  key?: ISshKeyJSON;
}

export const SshPublicKey: FunctionalComponent<ISshPublicKeyProps> = (props) => {
  const { key } = props;

  if (!key) {
    return null;
  }

  return [
    <RowTitle value="Public Key Info" />,
    <RowValue
      name="Algorithm"
      value={getStringByOID(key.algorithm)}
    />,
    <RowValue
      name="Thumbprint (SHA-256)"
      value={key.thumbprint}
      monospace
    />,
    <RowValue
      name="Value"
      value={key.value}
      monospace
      collapse
    />,
  ];
};
