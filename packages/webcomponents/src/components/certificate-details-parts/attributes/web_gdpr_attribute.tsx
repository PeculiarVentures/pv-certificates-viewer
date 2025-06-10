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
import { camelCaseToWords } from '../../../utils';
import { GeneralNamePart } from '../extensions/general_name_part';
import { RowValue, TableRowTable } from '../row';
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
        name={camelCaseToWords('assessmentAuthority')}
        value=""
      />
      <TableRowTable>
        <GeneralNamePart
          generalName={attribute.value.assessmentAuthority}
          getDNSNameLink={() => ''}
          getIPAddressLink={() => ''}
        />
      </TableRowTable>

      <RowValue
        name={camelCaseToWords('assessmentLocation')}
        value=""
      />
      <TableRowTable>
        <GeneralNamePart
          generalName={attribute.value.assessmentLocation}
          getDNSNameLink={() => ''}
          getIPAddressLink={() => ''}
        />
      </TableRowTable>

      <RowValue
        name={camelCaseToWords('assessmentRef')}
        value=""
      />
      <TableRowTable>
        <GeneralNamePart
          generalName={attribute.value.assessmentRef}
          getDNSNameLink={() => ''}
          getIPAddressLink={() => ''}
        />
      </TableRowTable>

      <RowValue
        name={camelCaseToWords('dataStorageTerritory')}
        value={attribute.value.dataStorageTerritory}
      />
      <RowValue
        name={camelCaseToWords('description')}
        value={attribute.value.description}
      />
    </BasicAttribute>
  );
};
