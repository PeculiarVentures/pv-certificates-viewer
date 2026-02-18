/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CRLNumber, id_ce_cRLNumber } from '@peculiar/asn1-x509';
import { AsnParser } from '@peculiar/asn1-schema';
import { ExtensionFactory } from './extension_factory';
import { BaseExtension } from './base_extension';
import { row, rowGroup } from '../rows_format';

/**
 * CRL Number Extension
 */
export class CRLNumberExtension extends BaseExtension {
  public readonly value: CRLNumber;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<CRLNumber>(asnExtnValue, CRLNumber);
  }

  public override toJSON() {
    return rowGroup(this.name, [[
      row('Critical', this.critical),
      row('Value', this.value.value.toString()),
    ]]);
  }
}

ExtensionFactory.register(id_ce_cRLNumber, CRLNumberExtension);
