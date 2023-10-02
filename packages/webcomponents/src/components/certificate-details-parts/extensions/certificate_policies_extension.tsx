/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import { CertificatePolicies, UserNotice, DisplayText } from '@peculiar/asn1-x509';
import { AsnParser } from '@peculiar/asn1-schema';

import { getStringByOID } from '../../../utils';
import { Extension } from '../../../crypto/extension';
import { RowValue, TableRowTable } from '../row';

import { BasicExtension } from './basic_extension';

interface ICertificatePoliciesExtensionProps {
  extension: Extension<CertificatePolicies>;
}

export const CertificatePoliciesExtension:
FunctionalComponent<ICertificatePoliciesExtensionProps> = (props) => {
  const { extension } = props;

  return (
    <BasicExtension
      extension={extension}
    >
      {Boolean(extension.value.length) && ([
        <RowValue
          name="Policies"
          value=""
        />,
        extension.value.map((policy) => (
          <TableRowTable>
            <RowValue
              name="Policy ID"
              value={getStringByOID(policy.policyIdentifier)}
            />
            {policy.policyQualifiers && Boolean(policy.policyQualifiers.length) && ([
              <RowValue
                name="Qualifiers"
                value=""
              />,
              policy.policyQualifiers.map((qualifierInfo) => {
                const data = [
                  <RowValue
                    name="Qualifier ID"
                    value={getStringByOID(qualifierInfo.policyQualifierId)}
                  />,
                ];

                if (qualifierInfo.policyQualifierId === '1.3.6.1.5.5.7.2.1') {
                  const value = AsnParser.parse(qualifierInfo.qualifier, DisplayText);

                  data.push(
                    <RowValue
                      name="Value"
                      value={value.toString()}
                    />,
                  );
                }

                if (qualifierInfo.policyQualifierId === '1.3.6.1.5.5.7.2.2') {
                  const value = AsnParser.parse(qualifierInfo.qualifier, UserNotice);

                  if (value.explicitText) {
                    data.push(
                      <RowValue
                        name="Value"
                        value={value.explicitText.toString()}
                      />,
                    );
                  }
                }

                return (
                  <TableRowTable>
                    {data}
                  </TableRowTable>
                );
              }),
            ])}
          </TableRowTable>
        )),
      ])}
    </BasicExtension>
  );
};
