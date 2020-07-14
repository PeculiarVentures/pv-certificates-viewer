import { AuthorityKeyIdentifier } from '@peculiar/asn1-x509';
import { Convert } from 'pvtsutils';

import { rowValue } from '../row_value';
import { Extension } from '../../../crypto/extension';

import { basic } from './basic';

export function authorityKeyIdentifier(extension: Extension, value: AuthorityKeyIdentifier) {
  return basic(
    extension,
    rowValue(
      'Key ID',
      Convert.ToHex(value.keyIdentifier),
      { monospace: true },
    ),
  );
}
