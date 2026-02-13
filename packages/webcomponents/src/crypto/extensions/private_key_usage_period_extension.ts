/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { PrivateKeyUsagePeriod } from '@peculiar/asn1-x509';
import { AsnParser } from '@peculiar/asn1-schema';
import { BaseExtension } from './base_extension';

/**
 * Private Key Usage Period Extension
 */
export class PrivateKeyUsagePeriodExtension extends BaseExtension {
  public static override readonly NAME = 'Private Key Usage Period';

  public readonly value: PrivateKeyUsagePeriod;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<PrivateKeyUsagePeriod>(asnExtnValue, PrivateKeyUsagePeriod);
  }

  public override toJSON(): Record<string, string | number | boolean> {
    return {
      Name: PrivateKeyUsagePeriodExtension.NAME,
      Critical: this.critical ? 'Yes' : 'No',
      'Not Before': new Date(this.value.notBefore).toUTCString(),
      'Not After': new Date(this.value.notAfter).toUTCString(),
    };
  }
}
