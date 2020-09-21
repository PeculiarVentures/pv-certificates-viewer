/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import { Convert } from 'pvtsutils';

import { ISignature } from '../../crypto';
import { l10n } from '../../utils';

import { getStringByOID } from './get_string_by_oid';
import { RowTitle, RowValue } from './row';

interface ISignatureProps {
  signature: ISignature;
}

export const Signature: FunctionalComponent<ISignatureProps> = (props) => {
  const { signature } = props;

  if (!signature) {
    return null;
  }

  return [
    <RowTitle
      value={l10n.getString('signature')}
    />,
    <RowValue
      name={l10n.getString('algorithm')}
      value={getStringByOID(signature.algorithm)}
    />,
    <RowValue
      name={l10n.getString('value')}
      value={Convert.ToHex(signature.value)}
      monospace
      collapse
    />,
  ];
};
