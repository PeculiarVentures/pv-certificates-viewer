/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { NetscapeCertType, id_netscapeCertType } from '@peculiar/asn1-x509-netscape';
import { AsnParser } from '@peculiar/asn1-schema';
import { row, rowGroup } from '../rows_format';
import { ExtensionFactory } from './extension_factory';
import { BaseExtension } from './base_extension';

/**
 * Netscape Certificate Type Extension
 */
export class NetscapeCertTypeExtension extends BaseExtension {
  public readonly value: NetscapeCertType;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<NetscapeCertType>(asnExtnValue, NetscapeCertType);
  }

  public override toJSON() {
    return rowGroup(this.name, [[
      row('Critical', this.critical),
      row('Type', this.value.toJSON().join(', ')),
    ]]);
  }
}

ExtensionFactory.register(id_netscapeCertType, NetscapeCertTypeExtension);
