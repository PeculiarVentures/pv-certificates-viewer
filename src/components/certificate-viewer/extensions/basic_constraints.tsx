import { BasicConstraints } from '@peculiar/asn1-x509';

import { rowValue } from '../row_value';
import { Extension } from '../../../crypto/extension';

import { basic } from './basic';

export function basicConstraints(extension: Extension, value: BasicConstraints) {
  return basic(
    extension,
    rowValue(
      'Certificate Authority',
      value.cA ? 'YES' : 'NO',
    ),
  );
}
