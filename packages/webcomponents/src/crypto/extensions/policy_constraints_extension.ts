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
    const content: Record<string, string> = { Critical: this.critical };

    if (this.value.requireExplicitPolicy) {
      content['Require Explicit Policy'] = AsnIntegerArrayBufferConverter.toASN(this.value.requireExplicitPolicy).valueBlock.toString();
    }

    if (this.value.inhibitPolicyMapping) {
      content['Inhibit Policy Mapping'] = AsnIntegerArrayBufferConverter.toASN(this.value.inhibitPolicyMapping).valueBlock.toString();
    }

    return { [this.name]: content };
  }
}

ExtensionFactory.register(id_ce_policyConstraints, PolicyConstraintsExtension);
