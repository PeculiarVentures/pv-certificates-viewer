/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { TNAuthorizationList } from '@peculiar/asn1-rfc8226';
import { AsnParser } from '@peculiar/asn1-schema';
import { BaseExtension } from './base_extension';

/**
 * TN Authorization List Extension
 */
export class TNAuthorizationListExtension extends BaseExtension {
  public static override readonly NAME = 'TN Authorization List';

  public readonly value: TNAuthorizationList;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<TNAuthorizationList>(asnExtnValue, TNAuthorizationList);
  }

  public override toJSON():
  Record<string, string | number | boolean | Record<string, string | number | boolean | Record<string, string>[]>[]> {
    const entries = this.value.map((entry) => {
      const entryData: Record<string, string | number> = {
        SPC: entry.spc,
      };

      if (entry.range) {
        entryData.Range = `start=${entry.range.start} count==${entry.range.count}`;
      }

      if (entry.one !== undefined) {
        entryData.One = entry.one;
      }

      return entryData;
    });

    return {
      Name: TNAuthorizationListExtension.NAME,
      Critical: this.critical ? 'Yes' : 'No',
      Entries: entries,
    };
  }
}
