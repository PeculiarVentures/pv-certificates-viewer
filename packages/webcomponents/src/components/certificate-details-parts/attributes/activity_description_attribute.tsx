/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import type { ActivityDescription } from '@peculiar/asn1-ntqwac';

import { Attribute } from '../../../crypto/attribute';
import { GeneralNamePart } from '../extensions/general_name_part';
import { RowValue } from '../row';
import { BasicAttribute } from './basic_attribute';

interface IActivityDescriptionAttributeProps {
  attribute: Attribute<ActivityDescription>;
}

export const ActivityDescriptionAttribute:
FunctionalComponent<IActivityDescriptionAttributeProps> = (props) => {
  const { attribute } = props;

  return (
    <BasicAttribute
      attribute={attribute}
    >
      <RowValue
        name="Code Authority"
        value=""
      />
      <GeneralNamePart
        generalName={attribute.value.codeAuthority}
        getDNSNameLink={() => ''}
        getIPAddressLink={() => ''}
      />

      <RowValue
        name="Code Id"
        value=""
      />
      <GeneralNamePart
        generalName={attribute.value.codeId}
        getDNSNameLink={() => ''}
        getIPAddressLink={() => ''}
      />

      <RowValue
        name="Short Name"
        value={attribute.value.shortName}
      />
      <RowValue
        name="Short Description"
        value={attribute.value.shortDescription}
      />
    </BasicAttribute>
  );
};
