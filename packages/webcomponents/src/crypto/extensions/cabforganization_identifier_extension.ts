/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AsnParser } from '@peculiar/asn1-schema';
import { ExtensionFactory } from './extension_factory';
import { BaseExtension } from './base_extension';
import { CabforganizationIdentifier, id_cabforganizationIdentifier } from './cabforganization_identifier';

/**
 * CABF Organization Identifier Extension
 */
export class CabforganizationIdentifierExtension extends BaseExtension {
  public readonly value: CabforganizationIdentifier;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<CabforganizationIdentifier>(
      asnExtnValue,
      CabforganizationIdentifier,
    );
  }

  public override toJSON() {
    const content: Record<string, string> = {
      Critical: this.critical,
      'Registration Scheme Identifier': this.value.registrationSchemeIdentifier,
      'Registration Country': this.value.registrationCountry,
      'Registration Reference': this.value.registrationReference,
    };

    if (this.value.registrationStateOrProvince) {
      content['Registration State Or Province'] = this.value.registrationStateOrProvince;
    }

    return { [this.name]: content };
  }
}

ExtensionFactory.register(id_cabforganizationIdentifier, CabforganizationIdentifierExtension);
