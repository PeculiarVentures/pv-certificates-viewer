import { SubjectKeyIdentifier } from '@peculiar/asn1-x509';
import { Convert } from 'pvtsutils';

import { rowValue } from '../row_value';
import { Extension } from '../../../crypto/extension';

import { basic } from './basic';

export function subjectKeyIdentifier(extension: Extension, value: SubjectKeyIdentifier) {
  return basic(
    extension,
    rowValue(
      'Key ID',
      Convert.ToHex(value),
      { monospace: true },
    ),
  );
}
