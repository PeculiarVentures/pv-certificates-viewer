/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import type { WebGDPR } from '@peculiar/asn1-ntqwac';

import type { Attribute } from '../../../crypto/attribute';
import { GeneralNamePart } from '../extensions/general_name_part';
import { RowValue } from '../row';
import { BasicAttribute } from './basic_attribute';

interface IWebGdprAttributeProps {
  attribute: Attribute<WebGDPR>;
}

export const WebGdprAttribute:
FunctionalComponent<IWebGdprAttributeProps> = (props) => {
  const { attribute } = props;

  return (
    <BasicAttribute
      attribute={attribute}
    >
      <RowValue
        name="Assessment Authority"
        value=""
      />
      <GeneralNamePart
        generalName={attribute.value.assessmentAuthority}
        getDNSNameLink={() => ''}
        getIPAddressLink={() => ''}
      />

      <RowValue
        name="Assessment Location"
        value=""
      />
      <GeneralNamePart
        generalName={attribute.value.assessmentLocation}
        getDNSNameLink={() => ''}
        getIPAddressLink={() => ''}
      />

      <RowValue
        name="Assessment Ref"
        value=""
      />
      <GeneralNamePart
        generalName={attribute.value.assessmentRef}
        getDNSNameLink={() => ''}
        getIPAddressLink={() => ''}
      />

      <RowValue
        name="Data Storage Territory"
        value={attribute.value.dataStorageTerritory}
      />
      <RowValue
        name="Description"
        value={attribute.value.description}
      />
    </BasicAttribute>
  );
};
