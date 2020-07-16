import { NetscapeCertType } from '@peculiar/asn1-x509-netscape';

import { rowValue } from '../row_value';
import { Extension } from '../../../crypto/extension';

import { basic } from './basic';

export function netscapeCertType(extension: Extension, value: NetscapeCertType) {
  return basic(
    extension,
    rowValue(
      'Type',
      value.toJSON().join(', '),
    ),
  );
}
