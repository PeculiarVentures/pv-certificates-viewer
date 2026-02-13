/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { InvalidityDate } from '@peculiar/asn1-x509';
import { AsnParser } from '@peculiar/asn1-schema';
import { BaseExtension } from './base_extension';

/**
 * Invalidity Date Extension
 */
export class InvalidityDateExtension extends BaseExtension {
  public static override readonly NAME = 'Invalidity Date';

  public readonly value: InvalidityDate;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<InvalidityDate>(asnExtnValue, InvalidityDate);
  }

  public override toJSON(): Record<string, string | number | boolean> {
    return {
      Name: InvalidityDateExtension.NAME,
      Critical: this.critical ? 'Yes' : 'No',
      Date: this.value.value.toISOString(),
    };
  }
}
