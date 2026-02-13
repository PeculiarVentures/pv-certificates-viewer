/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ExtendedKeyUsage } from '@peculiar/asn1-x509';
import { AsnParser } from '@peculiar/asn1-schema';
import { BaseExtension } from './base_extension';

/**
 * Extended Key Usage Extension
 */
export class ExtendedKeyUsageExtension extends BaseExtension {
  public static override readonly NAME = 'Extended Key Usage';

  public readonly value: ExtendedKeyUsage;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<ExtendedKeyUsage>(asnExtnValue, ExtendedKeyUsage);
  }

  public override toJSON(): Record<string, string | number | boolean | Record<string, string | number | boolean>[]> {
    const purposes = this.value.map((purpose) => ({
      Purpose: purpose,
    }));

    return {
      Name: ExtendedKeyUsageExtension.NAME,
      Critical: this.critical ? 'Yes' : 'No',
      Purposes: purposes,
    };
  }
}
