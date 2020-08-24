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
      <RowValue
        name="DNBvsDNO"
        value={attribute.value.DNBvsDNO.toNumber() ? 'YES' : 'NO'}
      />
      <RowValue
        name="DNBvsDNT"
        value={attribute.value.DNBvsDNT.toNumber() ? 'YES' : 'NO'}
      />
      <RowValue
        name="DNOvsDNT"
        value={attribute.value.DNOvsDNT.toNumber() ? 'YES' : 'NO'}
      />
    </BasicAttribute>
  );
};
