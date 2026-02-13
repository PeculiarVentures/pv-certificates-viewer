/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LeiRole } from '@peculiar/asn1-lei';
import { AsnParser } from '@peculiar/asn1-schema';
import { BaseExtension } from './base_extension';

/**
 * LEI Role Extension
 */
export class LeiRoleExtension extends BaseExtension {
  public static override readonly NAME = 'LEI Role';

  public readonly value: LeiRole;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<LeiRole>(asnExtnValue, LeiRole);
  }

  public override toJSON(): Record<string, string | number | boolean | Array<Record<string, string | number | boolean>>> {
    return {
      Name: LeiRoleExtension.NAME,
      Critical: this.critical ? 'Yes' : 'No',
      Role: this.value.text,
    };
  }
}
