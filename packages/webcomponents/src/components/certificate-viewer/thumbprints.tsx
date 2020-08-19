import { h, FunctionalComponent } from '@stencil/core';

import { RowTitle, RowValue } from './row';

interface IThumbprintsProps {
  thumbprints: Record<string, string>;
}

export const Thumbprints: FunctionalComponent<IThumbprintsProps> = (props) => {
  const { thumbprints } = props;

  if (!thumbprints) {
    return null;
  }

  const keys = Object.keys(thumbprints);

  if (!keys.length) {
    return null;
  }

  return [
    <RowTitle
      value="Thumbprints"
    />,
    keys.map((name) => (
      <RowValue
        name={name}
        value={thumbprints[name]}
        monospace
      />
    )),
  ];
};
