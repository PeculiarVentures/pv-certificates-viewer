/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ArchiveRevInfo } from '@peculiar/asn1-adobe-acrobat';
import { AsnParser } from '@peculiar/asn1-schema';
import { BaseExtension } from './base_extension';

/**
 * Archive Rev Info Extension
 */
export class ArchiveRevInfoExtension extends BaseExtension {
  public static override readonly NAME = 'Archive Rev Info';

  public readonly value: ArchiveRevInfo;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<ArchiveRevInfo>(asnExtnValue, ArchiveRevInfo);
  }

  public override toJSON(): Record<string, string | number | boolean> {
    return {
      Name: ArchiveRevInfoExtension.NAME,
      Critical: this.critical ? 'Yes' : 'No',
      Version: this.value.version,
    };
  }
}
