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
} from '@peculiar/asn1-x509';
import { AsnParser } from '@peculiar/asn1-schema';
import { BaseExtension } from './base_extension';

/**
 * Certificate Policies Extension
 */
export class CertificatePoliciesExtension extends BaseExtension {
  public static override readonly NAME = 'Certificate Policies';

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

  public override toJSON(): Record<string, string | number | boolean | Record<string, string | Record<string, string>[]>[]> {
    type TPolicyData = Record<string, string | Record<string, string>[]>;
    const policies: TPolicyData[] = this.value.map((policy) => {
      const policyData: TPolicyData = { 'Policy ID': policy.policyIdentifier };

      if (policy.policyQualifiers && policy.policyQualifiers.length > 0) {
        policyData.Qualifiers = policy.policyQualifiers.map((qualifier) => {
          const qualifierData: Record<string, string> = { 'Qualifier ID': qualifier.policyQualifierId };

          const parsedValue = this.parseQualifierValue(
            qualifier.policyQualifierId,
            qualifier.qualifier,
          );

          if (parsedValue !== undefined) {
            qualifierData.Value = parsedValue;
          }

          return qualifierData;
        });
      }

      return policyData;
    });

    return {
      Name: CertificatePoliciesExtension.NAME,
      Critical: this.critical ? 'Yes' : 'No',
      Policies: policies,
    };
  }
}
