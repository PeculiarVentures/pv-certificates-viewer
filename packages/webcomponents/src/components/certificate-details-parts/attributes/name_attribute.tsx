/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import type { Name } from '@peculiar/asn1-x509';
import type { Attribute } from '../../../crypto/attribute';
import { BasicAttribute } from './basic_attribute';
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
