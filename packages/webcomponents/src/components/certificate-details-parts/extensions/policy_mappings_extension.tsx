/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import { PolicyMappings } from '@peculiar/asn1-x509';

import { getStringByOID } from '../../../utils';
import { Extension } from '../../../crypto/extension';
import { RowValue, TableRowTable } from '../row';

import { BasicExtension } from './basic_extension';

interface IPolicyMappingsExtensionProps {
  extension: Extension<PolicyMappings>;
}

export const PolicyMappingsExtension:
FunctionalComponent<IPolicyMappingsExtensionProps> = (props) => {
  const { extension } = props;

  return (
    <BasicExtension
      extension={extension}
    >
      {extension.value.length > 0 && ([
        <RowValue
          name="Policies"
          value=""
        />,
        extension.value.map((policy) => (
          <TableRowTable>
            <RowValue
              name="Issuer Domain"
              value={getStringByOID(policy.issuerDomainPolicy)}
            />
            <RowValue
              name="Subject Domain"
              value={getStringByOID(policy.subjectDomainPolicy)}
            />
          </TableRowTable>
        )),
      ])}
    </BasicExtension>
  );
};
