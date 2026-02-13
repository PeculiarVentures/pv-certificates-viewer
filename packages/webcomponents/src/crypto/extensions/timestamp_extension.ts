/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Timestamp } from '@peculiar/asn1-adobe-acrobat';
import { AsnParser } from '@peculiar/asn1-schema';
import { BaseExtension } from './base_extension';
import { GeneralNameParser } from './general_name_parser';

/**
 * Timestamp Extension
 */
export class TimestampExtension extends BaseExtension {
  public static override readonly NAME = 'Timestamp';

  public readonly value: Timestamp;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<Timestamp>(asnExtnValue, Timestamp);
  }

  public override toJSON():
  Record<string, string | number | boolean | Record<string, string | number | boolean | Record<string, string>[]>[]> {
    const result: Record<string, string | number | boolean> = {
      Name: TimestampExtension.NAME,
      Critical: this.critical ? 'Yes' : 'No',
      Version: this.value.version,
      'Requires Auth': this.value.requiresAuth ? 'Yes' : 'No',
    };

    if (this.value.location) {
      const locationData = GeneralNameParser.toObject(this.value.location);

      Object.assign(result, locationData);
    }

    return result as Record<string, string | number | boolean | Record<string, string | number | boolean | Record<string, string>[]>[]>;
  }
}
