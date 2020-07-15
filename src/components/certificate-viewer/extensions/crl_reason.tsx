import { CRLReason } from '@peculiar/asn1-x509';

import { rowValue } from '../row_value';
import { Extension } from '../../../crypto/extension';

import { basic } from './basic';

export function crlReason(extension: Extension, value: CRLReason) {
  return basic(
    extension,
    rowValue(
      'Reason',
      value.toJSON(),
    ),
  );
}
