/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import type { ISignatureJSON } from '../../../crypto/fields/signature';
import { getStringByOID } from '../../../utils';
import { RowTitle, RowValue, TableRowTable } from './row';

interface ISignatureProps {
  signature: ISignatureJSON;
}

const renderSignatureDetails = (data: Omit<ISignatureJSON, 'parts'>) => [
  <RowValue
    name="Algorithm"
    value={getStringByOID(data.algorithm)}
  />,
  data.mtcProofError && (
    <RowValue
      name="MTC Proof Error"
      value={data.mtcProofError}
    />
  ),
  !data.mtcProof && (
    <RowValue
      name="Value"
      value={data.value || '(none)'}
      monospace
      collapse
    />
  ),
];

export const Signature: FunctionalComponent<ISignatureProps> = ({ signature }) => {
  if (!signature) {
    return null;
  }

  const proof = signature.mtcProof;

  return [
    <RowTitle value="Signature" />,
    renderSignatureDetails(signature),
    proof && [
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
    ],
    signature.parts?.map((part) => <TableRowTable>{renderSignatureDetails(part)}</TableRowTable>),
  ];
};
