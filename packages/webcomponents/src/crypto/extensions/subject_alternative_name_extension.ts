/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { SubjectAlternativeName } from '@peculiar/asn1-x509';
import { AsnParser } from '@peculiar/asn1-schema';
import { BaseExtension } from './base_extension';
import { GeneralNameParser } from './general_name_parser';

/**
 * Subject Alternative Name Extension
 */
export class SubjectAlternativeNameExtension extends BaseExtension {
  public static override readonly NAME = 'Subject Alternative Name';

  public readonly value: SubjectAlternativeName;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<SubjectAlternativeName>(asnExtnValue, SubjectAlternativeName);
  }

  public override toJSON(): Record<string, string | number | boolean | Record<string, string | number | boolean>[]> {
    const names = this.value.map((generalName) => GeneralNameParser.toObject(generalName));

    return {
      Name: SubjectAlternativeNameExtension.NAME,
      Critical: this.critical ? 'Yes' : 'No',
      Names: names,
    };
  }
}
