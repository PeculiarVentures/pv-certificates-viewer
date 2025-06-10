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
import { camelCaseToWords } from '../../../utils';
import { GeneralNamePart } from '../extensions/general_name_part';
import { RowValue, TableRowTable } from '../row';
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
        name={camelCaseToWords('codeAuthority')}
        value=""
      />
      <TableRowTable>
        <GeneralNamePart
          generalName={attribute.value.codeAuthority}
          getDNSNameLink={() => ''}
          getIPAddressLink={() => ''}
        />
      </TableRowTable>

      <RowValue
        name={camelCaseToWords('codeId')}
        value=""
      />
      <TableRowTable>
        <GeneralNamePart
          generalName={attribute.value.codeId}
          getDNSNameLink={() => ''}
          getIPAddressLink={() => ''}
        />
      </TableRowTable>

      <RowValue
        name={camelCaseToWords('shortName')}
        value={attribute.value.shortName}
      />
      <RowValue
        name={camelCaseToWords('shortDescription')}
        value={attribute.value.shortDescription}
      />
    </BasicAttribute>
  );
};
