/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import { AuthorityInfoAccessSyntax } from '@peculiar/asn1-x509';

import { RowValue } from '../row';
import { Extension } from '../../../crypto/extension';
import { getStringByOID } from '../get_string_by_oid';

import { BasicExtension } from './basic_extension';
import { GeneralNamePart } from './general_name_part';

interface IAuthorityInfoAccessSyntaxExtensionProps extends IGeneralNameOptions {
  extension: Extension<AuthorityInfoAccessSyntax>;
}

export const AuthorityInfoAccessSyntaxExtension:
FunctionalComponent<IAuthorityInfoAccessSyntaxExtensionProps> = (props) => {
  const { extension } = props;

  return (
    <BasicExtension
      extension={extension}
    >
      {extension.value.map((description, arrayIndex) => ([
        <RowValue
          name={`Method #${arrayIndex + 1}`}
          value={getStringByOID(description.accessMethod)}
        />,
        <GeneralNamePart
          generalName={description.accessLocation}
          {...props}
        />,
      ]))}
    </BasicExtension>
  );
};
