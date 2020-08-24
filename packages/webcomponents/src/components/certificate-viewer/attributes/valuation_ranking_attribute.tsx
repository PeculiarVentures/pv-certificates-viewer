import { h, FunctionalComponent } from '@stencil/core';
import type { ValuationRanking } from '@peculiar/asn1-ntqwac';

import { BasicAttribute } from './basic_attribute';
import type { Attribute } from '../../../crypto/attribute';
import { RowValue } from '../row';

interface IValuationRankingAttributeProps {
  attribute: Attribute<ValuationRanking>;
}

export const ValuationRankingAttribute:
FunctionalComponent<IValuationRankingAttributeProps> = (props) => {
  const { attribute } = props;

  return (
    <BasicAttribute
      attribute={attribute}
    >
      {Object.keys(attribute.value).map((keyName) => (
        <RowValue
          name={keyName}
          value={attribute.value[keyName]}
        />
      ))}
    </BasicAttribute>
  );
};
