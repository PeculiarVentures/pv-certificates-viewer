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
import { l10n, getStringByOID } from '../../utils';
import {
  RowTitle, RowValue, TableRowTable,
} from './row';

interface ISignatureProps {
  signature: ISignature;
}

export const Signature: FunctionalComponent<ISignatureProps> = (props) => {
  const { signature } = props;

  if (!signature) {
    return null;
  }

  function renderSignatureDetails(data: ISignature) {
    return [
      <RowValue
        name={l10n.getString('algorithm')}
        value={getStringByOID(data.algorithm)}
      />,
      <RowValue
        name={l10n.getString('value')}
        value={Convert.ToHex(data.value)}
        monospace
        collapse
      />,
    ];
  }

  return [
    <RowTitle
      value={l10n.getString('signature')}
    />,
    renderSignatureDetails(signature),
    (signature.params && signature.params.length && signature.params.map((param) => (
      <TableRowTable>
        {renderSignatureDetails(param)}
      </TableRowTable>
    ))),
  ];
};
