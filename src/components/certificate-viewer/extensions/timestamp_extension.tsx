import { h, FunctionalComponent } from '@stencil/core';
import { Timestamp } from '@peculiar/asn1-adobe-acrobat';

import { RowValue } from '../row';
import { Extension } from '../../../crypto/extension';

import { BasicExtension } from './basic_extension';
import { GeneralNamePart } from './general_name_part';

interface ITimestampExtensionProps extends IGeneralNameOptions {
  extension: Extension<Timestamp>;
}

export const TimestampExtension: FunctionalComponent<ITimestampExtensionProps> = (props) => {
  const { extension } = props;

  return (
    <BasicExtension
      extension={extension}
    >
      <RowValue
        name="Version"
        value={extension.value.version}
      />
      <GeneralNamePart
        generalName={extension.value.location}
        {...props}
      />
      <RowValue
        name="Requires Auth"
        value={extension.value.requiresAuth ? 'YES' : 'NO'}
      />
    </BasicExtension>
  );
};
