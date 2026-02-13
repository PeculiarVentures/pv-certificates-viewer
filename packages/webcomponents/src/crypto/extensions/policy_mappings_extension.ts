/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { PolicyMappings } from '@peculiar/asn1-x509';
import { AsnParser } from '@peculiar/asn1-schema';
import { OIDs } from '../../constants/oids';
import { BaseExtension } from './base_extension';

/**
 * Policy Mappings Extension
 */
export class PolicyMappingsExtension extends BaseExtension {
  public static override readonly NAME = 'Policy Mappings';

  public readonly value: PolicyMappings;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<PolicyMappings>(asnExtnValue, PolicyMappings);
  }

  public override toJSON():
  Record<string, string | number | boolean | Record<string, string | number | boolean | Record<string, string>[]>[]> {
    const policies = this.value.map((policy) => {
      const issuerOid = OIDs[policy.issuerDomainPolicy] || policy.issuerDomainPolicy;
      const subjectOid = OIDs[policy.subjectDomainPolicy] || policy.subjectDomainPolicy;

      return {
        'Issuer Domain': issuerOid === policy.issuerDomainPolicy
          ? policy.issuerDomainPolicy
          : `${issuerOid} (${policy.issuerDomainPolicy})`,
        'Subject Domain': subjectOid === policy.subjectDomainPolicy
          ? policy.subjectDomainPolicy
          : `${subjectOid} (${policy.subjectDomainPolicy})`,
      };
    });

    return {
      Name: PolicyMappingsExtension.NAME,
      Critical: this.critical ? 'Yes' : 'No',
      Policies: policies,
    };
  }
}
