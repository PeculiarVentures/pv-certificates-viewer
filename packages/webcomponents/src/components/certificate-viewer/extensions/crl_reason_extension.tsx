import { h, FunctionalComponent } from '@stencil/core';
import { CRLReason } from '@peculiar/asn1-x509';

import { RowValue } from '../row';
import { Extension } from '../../../crypto/extension';

import { BasicExtension } from './basic_extension';

interface ICRLReasonExtensionProps {
  extension: Extension<CRLReason>;
}

export const CRLReasonExtension: FunctionalComponent<ICRLReasonExtensionProps> = (props) => {
  const { extension } = props;

  return (
    <BasicExtension
      extension={extension}
    >
      <RowValue
        name="Reason"
        value={extension.value.toJSON()}
      />
    </BasicExtension>
  );
};
