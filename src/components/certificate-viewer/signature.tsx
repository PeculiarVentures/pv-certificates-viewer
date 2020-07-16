import { Convert } from 'pvtsutils';

import { ISignature } from '../../crypto';

import { rowTitle } from './row_title';
import { rowValue } from './row_value';
import { getStringByOID } from './get_string_by_oid';

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
