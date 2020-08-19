import { h, FunctionalComponent } from '@stencil/core';
import { SubjectAlternativeName } from '@peculiar/asn1-x509';

import { Extension } from '../../../crypto/extension';

import { BasicExtension } from './basic_extension';
import { GeneralNamePart } from './general_name_part';

interface ISubjectAlternativeNameExtensionProps extends IGeneralNameOptions {
  extension: Extension<SubjectAlternativeName>;
}

export const SubjectAlternativeNameExtension:
FunctionalComponent<ISubjectAlternativeNameExtensionProps> = (props) => {
  const { extension } = props;

  return (
    <BasicExtension
      extension={extension}
    >
      {extension.value.map((gn) => (
        <GeneralNamePart
          generalName={gn}
          {...props}
        />
      ))}
    </BasicExtension>
  );
};
