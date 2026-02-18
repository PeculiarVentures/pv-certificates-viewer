/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  CertificatePolicies,
  UserNotice,
  DisplayText,
  id_ce_certificatePolicies,
} from '@peculiar/asn1-x509';
import { AsnParser } from '@peculiar/asn1-schema';
import { row, rowGroup } from '../rows_format';
import { getStringByOID } from '../../utils';
import { ExtensionFactory } from './extension_factory';
import { BaseExtension } from './base_extension';

/**
 * Certificate Policies Extension
 */
export class CertificatePoliciesExtension extends BaseExtension {
  public readonly value: CertificatePolicies;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<CertificatePolicies>(asnExtnValue, CertificatePolicies);
  }

  private parseQualifierValue(qualifierId: string, qualifier: ArrayBuffer): string | undefined {
    if (qualifierId === '1.3.6.1.5.5.7.2.1') {
      try {
        const value = AsnParser.parse(qualifier, DisplayText);

        return value.toString();
      } catch {
        return undefined;
      }
    }

    if (qualifierId === '1.3.6.1.5.5.7.2.2') {
      try {
        const value = AsnParser.parse(qualifier, UserNotice);

        if (value.explicitText) {
          return value.explicitText.toString();
        }
      } catch {
        return undefined;
      }
    }

    return undefined;
  }

  public override toJSON() {
    const policyRows = this.value.map((policy) => {
      const rows = [row('Policy ID', getStringByOID(policy.policyIdentifier))];

      if (policy.policyQualifiers?.length) {
        rows.push(rowGroup('Qualifiers', policy.policyQualifiers.map((qualifier) => {
          const parsedValue = this.parseQualifierValue(
            qualifier.policyQualifierId,
            qualifier.qualifier,
          );
          const qualifierRows = [row('Qualifier ID', getStringByOID(qualifier.policyQualifierId))];

          if (parsedValue !== undefined) {
            qualifierRows.push(row('Value', parsedValue));
          }

          return qualifierRows;
        })));
      }

      return rows;
    });

    return rowGroup(this.name, [[
      row('Critical', this.critical),
      rowGroup('Policies', policyRows),
    ]]);
  }
}

ExtensionFactory.register(id_ce_certificatePolicies, CertificatePoliciesExtension);
