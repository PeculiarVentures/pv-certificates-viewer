import { LeiChoice } from '@peculiar/asn1-lei';

import { rowValue } from '../row_value';
import { Extension } from '../../../crypto/extension';

import { basic } from './basic';

export function lei(
  extension: Extension,
  value: LeiChoice,
  options: ILeiOptions,
) {
  return basic(
    extension,
    rowValue(
      'Identifier',
      value.text,
      { href: options.getLEILink(value.text) },
    ),
  );
}
