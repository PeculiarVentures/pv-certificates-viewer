/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import type { TypeRelationship } from '@peculiar/asn1-ntqwac';

import { BasicAttribute } from './basic_attribute';
import type { Attribute } from '../../../crypto/attribute';
import { l10n } from '../../../utils';
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
          value={attribute.value[keyName].toNumber() ? l10n.getString('yes') : l10n.getString('no')}
        />
      ))}
    </BasicAttribute>
  );
};
