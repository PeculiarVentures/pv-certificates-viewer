/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { EnrollCertTypeChoice, id_enrollCertType } from '@peculiar/asn1-x509-microsoft';
import { AsnParser } from '@peculiar/asn1-schema';
import { ExtensionFactory } from './extension_factory';
import { BaseExtension } from './base_extension';
import { row, rowGroup } from '../rows_format';

/**
 * Enroll Cert Type Choice Extension
 */
export class EnrollCertTypeChoiceExtension extends BaseExtension {
  public readonly value: EnrollCertTypeChoice;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<EnrollCertTypeChoice>(asnExtnValue, EnrollCertTypeChoice);
  }

  public override toJSON() {
    return rowGroup(this.name, [[
      row('Critical', this.critical),
      row('Value', this.value.toString()),
    ]]);
  }
}

ExtensionFactory.register(id_enrollCertType, EnrollCertTypeChoiceExtension);
