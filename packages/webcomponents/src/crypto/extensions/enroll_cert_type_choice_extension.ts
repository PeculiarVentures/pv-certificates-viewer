/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { EnrollCertTypeChoice } from '@peculiar/asn1-x509-microsoft';
import { AsnParser } from '@peculiar/asn1-schema';
import { BaseExtension } from './base_extension';

/**
 * Enroll Cert Type Choice Extension
 */
export class EnrollCertTypeChoiceExtension extends BaseExtension {
  public static override readonly NAME = 'Enroll Cert Type';

  public readonly value: EnrollCertTypeChoice;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<EnrollCertTypeChoice>(asnExtnValue, EnrollCertTypeChoice);
  }

  public override toJSON(): Record<string, string | number | boolean> {
    return {
      Name: EnrollCertTypeChoiceExtension.NAME,
      Critical: this.critical ? 'Yes' : 'No',
      Value: this.value.toString(),
    };
  }
}
