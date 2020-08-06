import { h, FunctionalComponent } from '@stencil/core';
import { NetscapeCertType } from '@peculiar/asn1-x509-netscape';

import { RowValue } from '../row';
import { Extension } from '../../../crypto/extension';

import { BasicExtension } from './basic_extension';

interface INetscapeCertTypeExtensionProps {
  extension: Extension<NetscapeCertType>;
}

export const NetscapeCertTypeExtension:
  FunctionalComponent<INetscapeCertTypeExtensionProps> = (props) => {
    const { extension } = props;

    return (
      <BasicExtension
        extension={extension}
      >
        <RowValue
          name="Type"
          value={extension.value.toJSON().join(', ')}
        />
      </BasicExtension>
    );
  };
