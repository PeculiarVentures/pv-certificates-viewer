import { rowValue } from '../row_value';
import { Extension } from '../../../crypto/extension';

import { basic } from './basic';

export function asString(extension: Extension, value: string) {
  return basic(
    extension,
    rowValue(
      'Value',
      value,
    ),
  );
}
