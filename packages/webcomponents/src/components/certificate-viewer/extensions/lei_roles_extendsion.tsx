import { h, FunctionalComponent } from '@stencil/core';
import { LeiRoles } from '@peculiar/asn1-lei';

import { RowValue } from '../row';
import { Extension } from '../../../crypto/extension';

import { BasicExtension } from './basic_extension';

interface ILeiRolesExtensionProps {
  extension: Extension<LeiRoles>;
}

export const LeiRolesExtension: FunctionalComponent<ILeiRolesExtensionProps> = (props) => {
  const { extension } = props;

  return (
    <BasicExtension
      extension={extension}
    >
      <RowValue
        name="Role"
        value={extension.value.text}
      />
    </BasicExtension>
  );
};
