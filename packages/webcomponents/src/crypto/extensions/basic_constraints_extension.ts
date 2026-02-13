/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { BasicConstraints } from '@peculiar/asn1-x509';
import { AsnParser } from '@peculiar/asn1-schema';
import { BaseExtension } from './base_extension';

/**
 * Basic Constraints Extension
 */
export class BasicConstraintsExtension extends BaseExtension {
  public static override readonly NAME = 'Basic Constraints';

  public readonly value: BasicConstraints;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<BasicConstraints>(asnExtnValue, BasicConstraints);
  }

  public override toJSON(): Record<string, string | number | boolean> {
    return {
      Name: BasicConstraintsExtension.NAME,
      Critical: this.critical ? 'Yes' : 'No',
      'Certificate Authority': this.value.cA ? 'Yes' : 'No',
      'Path Length Constraint': this.value.pathLenConstraint ?? '',
    };
  }
}
