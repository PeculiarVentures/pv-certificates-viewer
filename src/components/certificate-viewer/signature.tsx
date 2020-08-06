import { h, FunctionalComponent } from '@stencil/core';
import { Convert } from 'pvtsutils';

import { ISignature } from '../../crypto';

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
      value="Signature"
    />,
    <RowValue
      name="Algorithm"
      value={getStringByOID(signature.algorithm)}
    />,
    <RowValue
      name="Value"
      value={Convert.ToHex(signature.value)}
      monospace
      collapse
    />,
  ];
};
