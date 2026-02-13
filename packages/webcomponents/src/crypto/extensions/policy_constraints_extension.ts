/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { PolicyConstraints } from '@peculiar/asn1-x509';
import { AsnParser, AsnIntegerArrayBufferConverter } from '@peculiar/asn1-schema';
import { BaseExtension } from './base_extension';

/**
 * Policy Constraints Extension
 */
export class PolicyConstraintsExtension extends BaseExtension {
  public static override readonly NAME = 'Policy Constraints';

  public readonly value: PolicyConstraints;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<PolicyConstraints>(asnExtnValue, PolicyConstraints);
  }

  public override toJSON(): Record<string, string | number | boolean> {
    const result: Record<string, string | number | boolean> = {
      Name: PolicyConstraintsExtension.NAME,
      Critical: this.critical ? 'Yes' : 'No',
    };

    if (this.value.requireExplicitPolicy) {
      result['Require Explicit Policy'] = AsnIntegerArrayBufferConverter.toASN(
        this.value.requireExplicitPolicy,
      ).valueBlock.toString();
    }

    if (this.value.inhibitPolicyMapping) {
      result['Inhibit Policy Mapping'] = AsnIntegerArrayBufferConverter.toASN(
        this.value.inhibitPolicyMapping,
      ).valueBlock.toString();
    }

    return result;
  }
}
