import { EnrollCertTypeChoice } from '@peculiar/asn1-x509-microsoft';

import { rowValue } from '../row_value';
import { Extension } from '../../../crypto/extension';

import { basic } from './basic';

export function enrollCertType(extension: Extension, value: EnrollCertTypeChoice) {
  return basic(
    extension,
    rowValue(
      'Name',
      value.name,
    ),
  );
}
