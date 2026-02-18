/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { SubjectInfoAccessSyntax, id_pe_subjectInfoAccess } from '@peculiar/asn1-x509';
import { AsnParser } from '@peculiar/asn1-schema';
import {
  row, objectToRows, rowGroup,
} from '../rows_format';
import { ExtensionFactory } from './extension_factory';
import { BaseExtension } from './base_extension';
import { GeneralNameParser } from './general_name_parser';

/**
 * Subject Info Access Syntax Extension
 */
export class SubjectInfoAccessSyntaxExtension extends BaseExtension {
  public readonly value: SubjectInfoAccessSyntax;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<SubjectInfoAccessSyntax>(
      asnExtnValue,
      SubjectInfoAccessSyntax,
    );
  }

  public override toJSON() {
    const descriptionRows = this.value.map((description) => {
      const locationObj = GeneralNameParser.toObject(description.accessLocation) as Record<string, unknown>;

      return [
        row('Method', description.accessMethod),
        ...objectToRows(locationObj),
      ];
    });

    return rowGroup(this.name, [[
      row('Critical', this.critical),
      rowGroup('Descriptions', descriptionRows),
    ]]);
  }
}

ExtensionFactory.register(id_pe_subjectInfoAccess, SubjectInfoAccessSyntaxExtension);
