/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import { PolicyMappings } from '@peculiar/asn1-x509';

import { RowValue } from '../row';
import { Extension } from '../../../crypto/extension';
import { getStringByOID } from '../get_string_by_oid';

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
      {extension.value.map((policy, arrayIndex) => ([
        <RowValue
          name={`Policy #${arrayIndex + 1}`}
          value=""
        />,
        <RowValue
          name="Issuer Domain"
          value={getStringByOID(policy.issuerDomainPolicy)}
        />,
        <RowValue
          name="Subject Domain"
          value={getStringByOID(policy.subjectDomainPolicy)}
        />,
      ]))}
    </BasicExtension>
  );
};
