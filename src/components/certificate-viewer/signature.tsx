import { Convert } from 'pvtsutils';

import { ISignature } from '../../crypto';

import { rowTitle } from './rowTitle';
import { rowValue } from './rowValue';
import { getStringByOID } from './getStringByOID';

export function signature(signature: ISignature) {
  if (!signature) {
    return null;
  }

  return [
    rowTitle('Signature'),
    rowValue(
      'Algorithm',
      getStringByOID(signature.algorithm),
    ),
    rowValue(
      'Value',
      Convert.ToHex(signature.value),
      { monospace: true, collapse: true },
    ),
  ];
}
