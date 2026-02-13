/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CRLNumber } from '@peculiar/asn1-x509';
import { AsnParser } from '@peculiar/asn1-schema';
import { BaseExtension } from './base_extension';

/**
 * CRL Number Extension
 */
export class CRLNumberExtension extends BaseExtension {
  public static override readonly NAME = 'CRL Number';

  public readonly value: CRLNumber;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<CRLNumber>(asnExtnValue, CRLNumber);
  }

  public override toJSON(): Record<string, string | number | boolean> {
    return {
      Name: CRLNumberExtension.NAME,
      Critical: this.critical ? 'Yes' : 'No',
      Value: this.value.value.toString(),
    };
  }
}
