import { h, FunctionalComponent } from '@stencil/core';
import { BasicConstraints } from '@peculiar/asn1-x509';

import { RowValue } from '../row';
import { Extension } from '../../../crypto/extension';

import { BasicExtension } from './basic_extension';

interface IBasicConstraintsExtensionProps {
  extension: Extension<BasicConstraints>;
}

export const BasicConstraintsExtension:
  FunctionalComponent<IBasicConstraintsExtensionProps> = (props) => {
    const { extension } = props;

    return (
      <BasicExtension
        extension={extension}
      >
        <RowValue
          name="Certificate Authority"
          value={extension.value.cA ? 'YES' : 'NO'}
        />
        <RowValue
          name="Path Length Constraint"
          value={extension.value.pathLenConstraint}
        />
      </BasicExtension>
    );
  };
