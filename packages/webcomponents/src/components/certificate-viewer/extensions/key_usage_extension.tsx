import { h, FunctionalComponent } from '@stencil/core';
import { KeyUsage } from '@peculiar/asn1-x509';

import { RowValue } from '../row';
import { Extension } from '../../../crypto/extension';

import { BasicExtension } from './basic_extension';

interface IKeyUsageExtensionProps {
  extension: Extension<KeyUsage>;
}

export const KeyUsageExtension: FunctionalComponent<IKeyUsageExtensionProps> = (props) => {
  const { extension } = props;

  return (
    <BasicExtension
      extension={extension}
    >
      <RowValue
        name="Usage"
        value={extension.value.toJSON().join(', ')}
      />
    </BasicExtension>
  );
};
