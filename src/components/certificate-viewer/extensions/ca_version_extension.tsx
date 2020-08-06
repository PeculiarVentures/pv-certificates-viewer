import { h, FunctionalComponent } from '@stencil/core';
import { CaVersion } from '@peculiar/asn1-x509-microsoft';

import { RowValue } from '../row';
import { Extension } from '../../../crypto/extension';

import { BasicExtension } from './basic_extension';

interface ICaVersionExtensionProps {
  extension: Extension<CaVersion>;
}

export const CaVersionExtension: FunctionalComponent<ICaVersionExtensionProps> = (props) => {
  const { extension } = props;
  const version = extension.value.getVersion();

  return (
    <BasicExtension
      extension={extension}
    >
      <RowValue
        name="Certificate Index"
        value={version.certificateIndex}
      />
      <RowValue
        name="Key Index"
        value={version.keyIndex}
      />
    </BasicExtension>
  );
};
