/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CaVersion } from '@peculiar/asn1-x509-microsoft';
import { AsnParser } from '@peculiar/asn1-schema';
import { BaseExtension } from './base_extension';

/**
 * CA Version Extension
 */
export class CaVersionExtension extends BaseExtension {
  public static override readonly NAME = 'CA Version';

  public readonly value: CaVersion;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<CaVersion>(asnExtnValue, CaVersion);
  }

  public override toJSON(): Record<string, string | number | boolean> {
    const version = this.value.getVersion();

    return {
      Name: CaVersionExtension.NAME,
      Critical: this.critical ? 'Yes' : 'No',
      'Certificate Index': version.certificateIndex,
      'Key Index': version.keyIndex,
    };
  }
}
