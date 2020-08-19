import { h, FunctionalComponent } from '@stencil/core';
import { EnrollCertTypeChoice } from '@peculiar/asn1-x509-microsoft';

import { RowValue } from '../row';
import { Extension } from '../../../crypto/extension';

import { BasicExtension } from './basic_extension';

interface IEnrollCertTypeChoiceExtensionProps {
  extension: Extension<EnrollCertTypeChoice>;
}

export const EnrollCertTypeChoiceExtension:
FunctionalComponent<IEnrollCertTypeChoiceExtensionProps> = (props) => {
  const { extension } = props;

  return (
    <BasicExtension
      extension={extension}
    >
      <RowValue
        name="Name"
        value={extension.value.name}
      />
    </BasicExtension>
  );
};
