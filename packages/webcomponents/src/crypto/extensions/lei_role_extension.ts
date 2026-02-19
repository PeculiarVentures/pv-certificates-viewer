/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LeiRole, id_role } from '@peculiar/asn1-lei';
import { AsnParser } from '@peculiar/asn1-schema';
import { ExtensionFactory } from './extension_factory';
import { BaseExtension } from './base_extension';

/**
 * LEI Role Extension
 */
export class LeiRoleExtension extends BaseExtension {
  public readonly value: LeiRole;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<LeiRole>(asnExtnValue, LeiRole);
  }

  public override toJSON() {
    return {
      [this.name]: {
        Critical: this.critical,
        Role: this.value.text,
      },
    };
  }
}

ExtensionFactory.register(id_role, LeiRoleExtension);
