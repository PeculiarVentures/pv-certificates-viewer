/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { WebGDPR } from '@peculiar/asn1-ntqwac';
import { AsnParser } from '@peculiar/asn1-schema';
import { GeneralNameParser } from '../extensions/general_name_parser';
import { BaseAttribute } from './base_attribute';

/**
 * Web GDPR Attribute
 */
export class WebGdprAttribute extends BaseAttribute {
  public static override readonly NAME = 'Web GDPR';

  public readonly value: WebGDPR;

  constructor(raw: BufferSource) {
    super(raw);

    const asnAttrValue = this.asn.values[0];

    this.value = AsnParser.parse<WebGDPR>(asnAttrValue, WebGDPR);
  }

  public override toJSON():
  Record<string, string | number | boolean | Record<string, string | number | boolean | Record<string, string>[]>[]> {
    const result: Record<string, unknown> = { Name: WebGdprAttribute.NAME };

    if (this.value.assessmentAuthority) {
      result['Assessment Authority'] = GeneralNameParser.toObject(this.value.assessmentAuthority);
    }

    if (this.value.assessmentLocation) {
      result['Assessment Location'] = GeneralNameParser.toObject(this.value.assessmentLocation);
    }

    if (this.value.assessmentRef) {
      result['Assessment Ref'] = GeneralNameParser.toObject(this.value.assessmentRef);
    }

    if (this.value.dataStorageTerritory) {
      result['Data Storage Territory'] = this.value.dataStorageTerritory;
    }

    if (this.value.description) {
      result.Description = this.value.description;
    }

    return result as Record<
      string,
      string | number | boolean | Record<string, string | number | boolean | Record<string, string>[]>[]
    >;
  }
}
