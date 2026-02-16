/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ChallengePassword } from '@peculiar/asn1-pkcs9';
import { AsnParser } from '@peculiar/asn1-schema';
import { BaseAttribute } from './base_attribute';

/**
 * Challenge Password Attribute
 */
export class ChallengePasswordAttribute extends BaseAttribute {
  public static override readonly NAME = 'Challenge Password';

  public readonly value: ChallengePassword;

  constructor(raw: BufferSource) {
    super(raw);

    const asnAttrValue = this.asn.values[0];

    this.value = AsnParser.parse<ChallengePassword>(asnAttrValue, ChallengePassword);
  }

  public override toJSON(): Record<string, string | number | boolean> {
    return {
      Name: ChallengePasswordAttribute.NAME,
      Value: this.value.toString(),
    };
  }
}
