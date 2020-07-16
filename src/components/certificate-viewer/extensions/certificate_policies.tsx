import { h } from '@stencil/core';
import { CertificatePolicies, UserNotice, DisplayText } from '@peculiar/asn1-x509';
import { AsnParser } from '@peculiar/asn1-schema';

import { Extension } from '../../../crypto/extension';
import { rowValue } from '../row_value';
import { getStringByOID } from '../get_string_by_oid';

import { basic } from './basic';

export function certificatePolicies(extension: Extension, value: CertificatePolicies) {
  return basic(
    extension,
    value.map((policy, index) => ([
      rowValue(
        `Policy ID #${index + 1}`,
        getStringByOID(policy.policyIdentifier),
      ),
      policy.policyQualifiers?.map((qualifierInfo, indexInfo) => {
        const data = [
          rowValue(
            `Qualifier ID #${indexInfo + 1}`,
            getStringByOID(qualifierInfo.policyQualifierId),
          ),
        ];

        if (qualifierInfo.policyQualifierId === '1.3.6.1.5.5.7.2.1') {
          const value = AsnParser.parse(qualifierInfo.qualifier, DisplayText);

          data.push(
            rowValue(
              'Value',
              value.toString(),
            ),
          );
        }

        if (qualifierInfo.policyQualifierId === '1.3.6.1.5.5.7.2.2') {
          const value = AsnParser.parse(qualifierInfo.qualifier, UserNotice);

          if (value.explicitText) {
            data.push(
              rowValue(
                'Value',
                value.explicitText.toString(),
              ),
            );
          }
        }

        return data;
      }),
      <tr>
        <td />
        <td />
      </tr>,
    ])),
  );
}
