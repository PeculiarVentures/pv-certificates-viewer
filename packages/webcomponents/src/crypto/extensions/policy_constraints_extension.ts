/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { PolicyConstraints, id_ce_policyConstraints } from '@peculiar/asn1-x509';
import { AsnParser, AsnIntegerArrayBufferConverter } from '@peculiar/asn1-schema';
import { ExtensionFactory } from './extension_factory';
import { BaseExtension } from './base_extension';
import { row, rowGroup } from '../rows_format';

/**
 * Policy Constraints Extension
 */
export class PolicyConstraintsExtension extends BaseExtension {
  public readonly value: PolicyConstraints;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<PolicyConstraints>(asnExtnValue, PolicyConstraints);
  }

  public override toJSON() {
    const rows = [
      row('Critical', this.critical),
    ];

    if (this.value.requireExplicitPolicy) {
      rows.push(row('Require Explicit Policy', AsnIntegerArrayBufferConverter.toASN(this.value.requireExplicitPolicy).valueBlock.toString()));
    }

    if (this.value.inhibitPolicyMapping) {
      rows.push(row('Inhibit Policy Mapping', AsnIntegerArrayBufferConverter.toASN(this.value.inhibitPolicyMapping).valueBlock.toString()));
    }

    return rowGroup(this.name, [[
      ...rows,
    ]]);
  }
}

ExtensionFactory.register(id_ce_policyConstraints, PolicyConstraintsExtension);
