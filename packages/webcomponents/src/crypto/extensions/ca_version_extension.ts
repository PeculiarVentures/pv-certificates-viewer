/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CaVersion, id_caVersion } from '@peculiar/asn1-x509-microsoft';
import { AsnParser } from '@peculiar/asn1-schema';
import { ExtensionFactory } from './extension_factory';
import { BaseExtension } from './base_extension';
import { row, rowGroup } from '../rows_format';

/**
 * CA Version Extension
 */
export class CaVersionExtension extends BaseExtension {
  public readonly value: CaVersion;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<CaVersion>(asnExtnValue, CaVersion);
  }

  public override toJSON() {
    const version = this.value.getVersion();

    return rowGroup(this.name, [[
      row('Critical', this.critical),
      row('Certificate Index', version.certificateIndex),
      row('Key Index', version.keyIndex),
    ]]);
  }
}

ExtensionFactory.register(id_caVersion, CaVersionExtension);
