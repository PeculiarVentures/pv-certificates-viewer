import { rowTitle } from './row_title';
import { rowValue } from './row_value';

export function thumbprints(thumbprints: Record<string, string>) {
  if (!thumbprints) {
    return null;
  }

  return [
    rowTitle('Thumbprints'),
    Object.keys(thumbprints).map(name => (
      rowValue(
        name,
        thumbprints[name],
        { monospace: true },
      )
    )),
  ];
}
