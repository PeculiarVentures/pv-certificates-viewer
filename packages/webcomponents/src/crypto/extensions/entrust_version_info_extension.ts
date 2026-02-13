/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { EntrustVersionInfo } from '@peculiar/asn1-x509';
import { AsnParser } from '@peculiar/asn1-schema';
import { BaseExtension } from './base_extension';

/**
 * Entrust Version Info Extension
 */
export class EntrustVersionInfoExtension extends BaseExtension {
  public static override readonly NAME = 'Entrust Version Info';

  public readonly value: EntrustVersionInfo;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<EntrustVersionInfo>(asnExtnValue, EntrustVersionInfo);
  }

  public override toJSON(): Record<string, string | number | boolean> {
    return {
      Name: EntrustVersionInfoExtension.NAME,
      Critical: this.critical ? 'Yes' : 'No',
      Version: this.value.entrustVers,
      'Info Flags': this.value.entrustInfoFlags.toJSON().join(', '),
    };
  }
}
