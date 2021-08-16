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

import { RowValue } from '../row';
import { Extension } from '../../../crypto/extension';
import { getStringByOID } from '../get_string_by_oid';

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
      {extension.value.map((policy, arrayIndex) => ([
        <RowValue
          name={`Policy #${arrayIndex + 1}`}
          value=""
        />,
        <RowValue
          name="ID"
          value={getStringByOID(policy.policyIdentifier)}
        />,
        policy.policyQualifiers?.map((qualifierInfo, indexInfo) => {
          const data = [
            <RowValue
              name={`Qualifier #${arrayIndex + 1}.${indexInfo + 1}`}
              value=""
            />,
            <RowValue
              name="ID"
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

          return data;
        }),
      ]))}
    </BasicExtension>
  );
};
