/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { PolicyMappings, id_ce_policyMappings } from '@peculiar/asn1-x509';
import { AsnParser } from '@peculiar/asn1-schema';
import { ExtensionFactory } from './extension_factory';
import { OIDs } from '../../constants/oids';
import { BaseExtension } from './base_extension';
import { row, rowGroup } from '../rows_format';

/**
 * Policy Mappings Extension
 */
export class PolicyMappingsExtension extends BaseExtension {
  public readonly value: PolicyMappings;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<PolicyMappings>(asnExtnValue, PolicyMappings);
  }

  public override toJSON() {
    const policyRows = this.value.map((policy) => {
      const issuerOid = OIDs[policy.issuerDomainPolicy] || policy.issuerDomainPolicy;
      const subjectOid = OIDs[policy.subjectDomainPolicy] || policy.subjectDomainPolicy;

      return [
        row('Issuer Domain', issuerOid === policy.issuerDomainPolicy ? policy.issuerDomainPolicy : `${issuerOid} (${policy.issuerDomainPolicy})`),
        row('Subject Domain', subjectOid === policy.subjectDomainPolicy ? policy.subjectDomainPolicy : `${subjectOid} (${policy.subjectDomainPolicy})`),
      ];
    });

    return rowGroup(this.name, [[
      row('Critical', this.critical),
      rowGroup('Policies', policyRows),
    ]]);
  }
}

ExtensionFactory.register(id_ce_policyMappings, PolicyMappingsExtension);
