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

    return {
      [this.name]: {
        Critical: this.critical,
        'Certificate Index': version.certificateIndex,
        'Key Index': version.keyIndex,
      },
    };
  }
}

ExtensionFactory.register(id_caVersion, CaVersionExtension);
