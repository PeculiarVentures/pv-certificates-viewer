/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import { AuthorityInfoAccessSyntax, SubjectInfoAccessSyntax } from '@peculiar/asn1-x509';

import { getStringByOID } from '../../../utils';
import { Extension } from '../../../crypto/extension';
import { RowValue, TableRowTable } from '../row';

import { BasicExtension } from './basic_extension';
import { GeneralNamePart } from './general_name_part';

interface IInfoAccessSyntaxExtensionProps extends IGeneralNameOptions {
  extension: Extension<AuthorityInfoAccessSyntax | SubjectInfoAccessSyntax>;
}

export const InfoAccessSyntaxExtension:
FunctionalComponent<IInfoAccessSyntaxExtensionProps> = (props) => {
  const { extension } = props;

  return (
    <BasicExtension
      extension={extension}
    >
      {Boolean(extension.value.length) && ([
        <RowValue
          name="Descriptions"
          value=""
        />,
        extension.value.map((description) => (
          <TableRowTable>
            <RowValue
              name="Method"
              value={getStringByOID(description.accessMethod)}
            />
            <GeneralNamePart
              generalName={description.accessLocation}
              {...props}
            />
          </TableRowTable>
        )),
      ])}
    </BasicExtension>
  );
};
