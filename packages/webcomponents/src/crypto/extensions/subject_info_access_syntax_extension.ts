/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { SubjectInfoAccessSyntax } from '@peculiar/asn1-x509';
import { AsnParser } from '@peculiar/asn1-schema';
import { BaseExtension } from './base_extension';
import { GeneralNameParser } from './general_name_parser';

/**
 * Subject Info Access Syntax Extension
 */
export class SubjectInfoAccessSyntaxExtension extends BaseExtension {
  public static override readonly NAME = 'Subject Info Access';

  public readonly value: SubjectInfoAccessSyntax;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<SubjectInfoAccessSyntax>(
      asnExtnValue,
      SubjectInfoAccessSyntax,
    );
  }

  public override toJSON(): Record<
    string,
    string | number | boolean | Record<string, string | number | boolean>[]
  > {
    const descriptions = this.value.map((description) => {
      return {
        Method: description.accessMethod,
        ...GeneralNameParser.toObject(description.accessLocation),
      };
    });

    return {
      Name: SubjectInfoAccessSyntaxExtension.NAME,
      Critical: this.critical ? 'Yes' : 'No',
      Descriptions: descriptions,
    };
  }
}
