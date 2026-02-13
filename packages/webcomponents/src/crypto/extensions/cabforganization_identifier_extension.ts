/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AsnParser } from '@peculiar/asn1-schema';
import { BaseExtension } from './base_extension';
import { CabforganizationIdentifier } from './cabforganization_identifier';

/**
 * CABF Organization Identifier Extension
 */
export class CabforganizationIdentifierExtension extends BaseExtension {
  public static override readonly NAME = 'CABF Organization Identifier';

  public readonly value: CabforganizationIdentifier;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<CabforganizationIdentifier>(
      asnExtnValue,
      CabforganizationIdentifier,
    );
  }

  public override toJSON(): Record<string, string | number | boolean> {
    const result: Record<string, string | number | boolean> = {
      Name: CabforganizationIdentifierExtension.NAME,
      Critical: this.critical ? 'Yes' : 'No',
      'Registration Scheme Identifier': this.value.registrationSchemeIdentifier,
      'Registration Country': this.value.registrationCountry,
      'Registration Reference': this.value.registrationReference,
    };

    if (this.value.registrationStateOrProvince) {
      result['Registration State Or Province'] = this.value.registrationStateOrProvince;
    }

    return result;
  }
}
