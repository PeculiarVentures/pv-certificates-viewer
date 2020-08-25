import { h, FunctionalComponent } from '@stencil/core';
import type { TypeRelationship } from '@peculiar/asn1-ntqwac';

import { BasicAttribute } from './basic_attribute';
import type { Attribute } from '../../../crypto/attribute';
import { RowValue } from '../row';

interface ITypeRelationshipAttributeProps {
  attribute: Attribute<TypeRelationship>;
}

export const TypeRelationshipAttribute:
FunctionalComponent<ITypeRelationshipAttributeProps> = (props) => {
  const { attribute } = props;

  return (
    <BasicAttribute
      attribute={attribute}
    >
      {Object.keys(attribute.value).map((keyName) => (
        <RowValue
          name={keyName}
          value={attribute.value[keyName].toNumber() ? 'YES' : 'NO'}
        />
      ))}
    </BasicAttribute>
  );
};
