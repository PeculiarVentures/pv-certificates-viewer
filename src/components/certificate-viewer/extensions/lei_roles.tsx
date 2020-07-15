import { LeiRoles } from '@peculiar/asn1-lei';

import { rowValue } from '../row_value';
import { Extension } from '../../../crypto/extension';

import { basic } from './basic';

export function leiRoles(extension: Extension, value: LeiRoles) {
  return basic(
    extension,
    rowValue(
      'Role',
      value.text,
    ),
  );
}
