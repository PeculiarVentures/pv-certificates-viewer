/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import { SubjectDirectoryAttributes } from '@peculiar/asn1-x509';
import { Extension } from '../../../crypto/extension';
import { getStringByOID } from '../../../utils';
import { RowValue, TableRowTable } from '../row';
import { BasicExtension } from './basic_extension';
import { getAttributeValue } from './attribute_value';

interface ISubjectDirectoryAttributesExtensionProps {
  extension: Extension<SubjectDirectoryAttributes>;
}

export const SubjectDirectoryAttributesExtension:
FunctionalComponent<ISubjectDirectoryAttributesExtensionProps> = (props) => {
  const { extension } = props;

  return (
    <BasicExtension
      extension={extension}
    >
      {Boolean(extension.value.length) && ([
        <RowValue
          name="Attributes"
          value=""
        />,
        extension.value.map((attribute) => (
          <TableRowTable>
            <RowValue
              name="Type"
              value={getStringByOID(attribute.type)}
            />
            <RowValue
              name="Value"
              value={getAttributeValue(attribute)}
            />
          </TableRowTable>
        )),
      ])}
    </BasicExtension>
  );
};
