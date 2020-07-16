import { KeyUsage } from '@peculiar/asn1-x509';

import { rowValue } from '../row_value';
import { Extension } from '../../../crypto/extension';

import { basic } from './basic';

export function keyUsage(extension: Extension, value: KeyUsage) {
  return basic(
    extension,
    rowValue(
      'Usage',
      value.toJSON().join(', '),
    ),
  );
}
