import { rowTitle } from './row_title';
import { rowValue } from './row_value';

export function thumbprints(thumbprints: Record<string, string>) {
  if (!thumbprints) {
    return null;
  }

  const keys = Object.keys(thumbprints);

  if (!keys.length) {
    return null;
  }

  return [
    rowTitle('Thumbprints'),
    keys.map(name => (
      rowValue(
        name,
        thumbprints[name],
        { monospace: true },
      )
    )),
  ];
}
