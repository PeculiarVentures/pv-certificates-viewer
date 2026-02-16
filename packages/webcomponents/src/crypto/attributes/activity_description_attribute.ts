/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ActivityDescription } from '@peculiar/asn1-ntqwac';
import { AsnParser } from '@peculiar/asn1-schema';
import { GeneralNameParser } from '../extensions/general_name_parser';
import { BaseAttribute } from './base_attribute';

/**
 * Activity Description Attribute
 */
export class ActivityDescriptionAttribute extends BaseAttribute {
  public static override readonly NAME = 'Activity Description';

  public readonly value: ActivityDescription;

  constructor(raw: BufferSource) {
    super(raw);

    const asnAttrValue = this.asn.values[0];

    this.value = AsnParser.parse<ActivityDescription>(asnAttrValue, ActivityDescription);
  }

  public override toJSON():
  Record<string, string | number | boolean | Record<string, string | number | boolean | Record<string, string>[]>[]> {
    const result: Record<string, unknown> = {
      Name: ActivityDescriptionAttribute.NAME,
    };

    if (this.value.codeAuthority) {
      result['Code Authority'] = GeneralNameParser.toObject(this.value.codeAuthority);
    }

    if (this.value.codeId) {
      result['Code ID'] = GeneralNameParser.toObject(this.value.codeId);
    }

    if (this.value.shortName) {
      result['Short Name'] = this.value.shortName;
    }

    if (this.value.shortDescription) {
      result['Short Description'] = this.value.shortDescription;
    }

    return result as Record<
      string,
      string | number | boolean | Record<string, string | number | boolean | Record<string, string>[]>[]
    >;
  }
}
