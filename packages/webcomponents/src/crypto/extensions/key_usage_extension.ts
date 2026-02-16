/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { KeyUsage, id_ce_keyUsage } from '@peculiar/asn1-x509';
import { AsnParser } from '@peculiar/asn1-schema';
import { ExtensionFactory } from './extension_factory';
import { BaseExtension } from './base_extension';

/**
 * Key Usage Extension
 */
export class KeyUsageExtension extends BaseExtension {
  public static override readonly NAME = 'Key Usage';

  public readonly value: KeyUsage;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<KeyUsage>(asnExtnValue, KeyUsage);
  }

  public override toJSON(): Record<string, string | number | boolean> {
    return {
      Name: KeyUsageExtension.NAME,
      Critical: this.critical ? 'Yes' : 'No',
      Usage: this.value.toJSON().join(', '),
    };
  }
}

ExtensionFactory.register(id_ce_keyUsage, KeyUsageExtension);
