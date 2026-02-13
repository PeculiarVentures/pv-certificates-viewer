/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AuthorityInfoAccessSyntax } from '@peculiar/asn1-x509';
import { AsnParser } from '@peculiar/asn1-schema';
import { BaseExtension } from './base_extension';
import { GeneralNameParser } from './general_name_parser';

/**
 * Authority Info Access Syntax Extension
 */
export class AuthorityInfoAccessSyntaxExtension extends BaseExtension {
  public static override readonly NAME = 'Authority Info Access';

  public readonly value: AuthorityInfoAccessSyntax;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<AuthorityInfoAccessSyntax>(asnExtnValue, AuthorityInfoAccessSyntax);
  }

  public override toJSON(): Record<string, string | number | boolean | Record<string, string | number | boolean>[]> {
    const descriptions = this.value.map((description) => {
      return {
        Method: description.accessMethod,
        ...GeneralNameParser.toObject(description.accessLocation),
      };
    });

    return {
      Name: AuthorityInfoAccessSyntaxExtension.NAME,
      Critical: this.critical ? 'Yes' : 'No',
      Descriptions: descriptions,
    };
  }
}
