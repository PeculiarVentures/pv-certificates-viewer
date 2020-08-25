import { h, FunctionalComponent } from '@stencil/core';
import type { Name } from '@peculiar/asn1-x509';

import { BasicAttribute } from './basic_attribute';
import type { Attribute } from '../../../crypto/attribute';
import { NamePart } from './name_part';

interface INameAttributeProps {
  attribute: Attribute<Name>;
}

export const NameAttribute:
FunctionalComponent<INameAttributeProps> = (props) => {
  const { attribute } = props;

  return (
    <BasicAttribute
      attribute={attribute}
    >
      <NamePart
        name={attribute.value}
      />
    </BasicAttribute>
  );
};
