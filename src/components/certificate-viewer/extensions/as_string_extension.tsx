import { h, FunctionalComponent } from '@stencil/core';

import { RowValue } from '../row';
import { Extension } from '../../../crypto/extension';

import { BasicExtension } from './basic_extension';

interface IAsStringExtensionProps {
  extension: Extension<string>;
}

export const AsStringExtension: FunctionalComponent<IAsStringExtensionProps> = (props) => {
  const { extension } = props;

  return (
    <BasicExtension
      extension={extension}
    >
      <RowValue
        name="Value"
        value={extension.value}
        monospace
      />
    </BasicExtension>
  );
};
