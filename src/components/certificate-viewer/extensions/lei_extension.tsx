import { h, FunctionalComponent } from '@stencil/core';
import { LeiChoice } from '@peculiar/asn1-lei';

import { RowValue } from '../row';
import { Extension } from '../../../crypto/extension';

import { BasicExtension } from './basic_extension';

interface ILeiExtensionProps extends ILeiOptions {
  extension: Extension<LeiChoice>;
}

export const LeiExtension: FunctionalComponent<ILeiExtensionProps> = (props) => {
  const { extension, getLEILink } = props;

  return (
    <BasicExtension
      extension={extension}
    >
      <RowValue
        name="Identifier"
        value={extension.value.text}
        href={getLEILink(extension.value.text)}
      />
    </BasicExtension>
  );
};
