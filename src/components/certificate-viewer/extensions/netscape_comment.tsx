import { NetscapeComment } from '@peculiar/asn1-x509-netscape';

import { rowValue } from '../row_value';
import { Extension } from '../../../crypto/extension';

import { basic } from './basic';

export function netscapeComment(extension: Extension, value: NetscapeComment) {
  return basic(
    extension,
    rowValue(
      'Comment',
      value.value,
    ),
  );
}
