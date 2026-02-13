/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { BaseCRLNumber } from '@peculiar/asn1-x509';
import { AsnParser } from '@peculiar/asn1-schema';
import { BaseExtension } from './base_extension';

/**
 * Delta CRL Indicator Extension
 */
export class DeltaCRLIndicatorExtension extends BaseExtension {
  public static override readonly NAME = 'Delta CRL Indicator';

  public readonly value: BaseCRLNumber;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<BaseCRLNumber>(asnExtnValue, BaseCRLNumber);
  }

  public override toJSON(): Record<string, string | number | boolean> {
    return {
      Name: DeltaCRLIndicatorExtension.NAME,
      Critical: this.critical ? 'Yes' : 'No',
      Value: this.value.value.toString(),
    };
  }
}
