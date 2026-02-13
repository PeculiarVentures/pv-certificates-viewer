/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { IssueAlternativeName } from '@peculiar/asn1-x509';
import { AsnParser } from '@peculiar/asn1-schema';
import { BaseExtension } from './base_extension';
import { GeneralNameParser } from './general_name_parser';

/**
 * Issuer Alternative Name Extension
 */
export class IssuerAlternativeNameExtension extends BaseExtension {
  public static override readonly NAME = 'Issuer Alternative Name';

  public readonly value: IssueAlternativeName;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<IssueAlternativeName>(asnExtnValue, IssueAlternativeName);
  }

  public override toJSON():
  Record<string, string | number | boolean | Record<string, string | number | boolean>[]> {
    const names = this.value.map((generalName) => GeneralNameParser.toObject(generalName));

    return {
      Name: IssuerAlternativeNameExtension.NAME,
      Critical: this.critical ? 'Yes' : 'No',
      Names: names,
    };
  }
}
