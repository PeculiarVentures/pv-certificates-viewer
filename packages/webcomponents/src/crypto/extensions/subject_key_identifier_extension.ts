/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { SubjectKeyIdentifier, id_ce_subjectKeyIdentifier } from '@peculiar/asn1-x509';
import { AsnParser } from '@peculiar/asn1-schema';
import { Convert } from 'pvtsutils';
import { ExtensionFactory } from './extension_factory';
import { BaseExtension } from './base_extension';
import { row, hexRow, rowGroup } from '../rows_format';

/**
 * Subject Key Identifier Extension
 */
export class SubjectKeyIdentifierExtension extends BaseExtension {
  public readonly value: SubjectKeyIdentifier;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<SubjectKeyIdentifier>(asnExtnValue, SubjectKeyIdentifier);
  }

  public override toJSON() {
    return rowGroup(this.name, [[
      row('Critical', this.critical),
      hexRow('Key ID', Convert.ToHex(this.value.buffer)),
    ]]);
  }
}

ExtensionFactory.register(id_ce_subjectKeyIdentifier, SubjectKeyIdentifierExtension);
