import { Convert } from 'pvtsutils';

import { rowTitle } from './row_title';
import { rowValue } from './row_value';

export function thumbprints(thumbprints: Record<string, ArrayBuffer>) {
  if (!thumbprints) {
    return null;
  }

  return [
    rowTitle('Thumbprints'),
    Object.keys(thumbprints).map(name => (
      rowValue(
        name,
        Convert.ToHex(thumbprints[name]),
        { monospace: true },
      )
    )),
  ];
}
