/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import { Convert, BufferSourceConverter } from 'pvtsutils';
import { ISignature } from '../../crypto';
import { l10n, getStringByOID } from '../../utils';
import { RowTitle, RowValue, TableRowTable } from './row';

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
      !data.mtcProof && (
        <RowValue
          name={l10n.getString('value')}
          value={
            data.value && BufferSourceConverter.toUint8Array(data.value).length
              ? Convert.ToHex(data.value)
              : '(none)'
          }
          monospace
          collapse
        />
      ),
    ];
  }

  function renderMtcProof() {
    const proof = signature.mtcProof;

    if (!proof) {
      return null;
    }

    return [
      <RowValue
        name="Start"
        value={proof.start}
      />,
      <RowValue
        name="End"
        value={proof.end}
      />,
      <RowValue
        name="Subtree Size"
        value={proof.subtreeSize}
      />,
      <RowValue
        name="Landmark Relative"
        value={proof.isLandmarkRelative ? 'YES' : 'NO'}
      />,
      proof.inclusionProof.length > 0 && (
        <RowValue
          name="Inclusion Proof"
          value={proof.inclusionProof.join('\n')}
          monospace
          collapse
        />
      ),
      proof.signatures.length > 0 &&
        proof.signatures.map((entry) => (
          <TableRowTable>
            <RowValue
              name="Cosigner ID"
              value={entry.cosignerId}
            />
            <RowValue
              name="Signature"
              value={entry.signature}
              monospace
              collapse
            />
          </TableRowTable>
        )),
    ];
  }

  return [
    <RowTitle value={l10n.getString('signature')} />,
    renderSignatureDetails(signature),
    renderMtcProof(),
    signature.params &&
      signature.params.length &&
      signature.params.map((param) => (
        <TableRowTable>{renderSignatureDetails(param)}</TableRowTable>
      )),
  ];
};
