/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { PrivateKeyUsagePeriod, id_ce_privateKeyUsagePeriod } from '@peculiar/asn1-x509';
import { AsnParser } from '@peculiar/asn1-schema';
import { row, rowGroup } from '../rows_format';
import { ExtensionFactory } from './extension_factory';
import { BaseExtension } from './base_extension';

/**
 * Private Key Usage Period Extension
 */
export class PrivateKeyUsagePeriodExtension extends BaseExtension {
  public readonly value: PrivateKeyUsagePeriod;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<PrivateKeyUsagePeriod>(asnExtnValue, PrivateKeyUsagePeriod);
  }

  public override toJSON() {
    return rowGroup(this.name, [[
      row('Critical', this.critical),
      row('Not Before', new Date(this.value.notBefore).toUTCString()),
      row('Not After', new Date(this.value.notAfter).toUTCString()),
    ]]);
  }
}

ExtensionFactory.register(id_ce_privateKeyUsagePeriod, PrivateKeyUsagePeriodExtension);
