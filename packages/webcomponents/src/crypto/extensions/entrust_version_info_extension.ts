/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { EntrustVersionInfo, id_entrust_entrustVersInfo } from '@peculiar/asn1-x509';
import { AsnParser } from '@peculiar/asn1-schema';
import { ExtensionFactory } from './extension_factory';
import { BaseExtension } from './base_extension';

/**
 * Entrust Version Info Extension
 */
export class EntrustVersionInfoExtension extends BaseExtension {
  public readonly value: EntrustVersionInfo;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<EntrustVersionInfo>(asnExtnValue, EntrustVersionInfo);
  }

  public override toJSON() {
    return {
      [this.name]: {
        Critical: this.critical,
        Version: this.value.entrustVers,
        'Info Flags': this.value.entrustInfoFlags.toJSON().join(', '),
      },
    };
  }
}

ExtensionFactory.register(id_entrust_entrustVersInfo, EntrustVersionInfoExtension);
