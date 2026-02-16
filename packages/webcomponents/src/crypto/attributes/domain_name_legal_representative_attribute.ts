/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { DomainNameLegalRepresentative } from '@peculiar/asn1-ntqwac';
import { AsnParser } from '@peculiar/asn1-schema';
import { BaseAttribute } from './base_attribute';

/**
 * Domain Name Legal Representative Attribute
 */
export class DomainNameLegalRepresentativeAttribute extends BaseAttribute {
  public static override readonly NAME = 'Domain Name Legal Representative';

  public readonly value: DomainNameLegalRepresentative;

  constructor(raw: BufferSource) {
    super(raw);

    const asnAttrValue = this.asn.values[0];

    this.value = AsnParser.parse<DomainNameLegalRepresentative>(asnAttrValue, DomainNameLegalRepresentative);
  }

  public override toJSON():
  Record<string, string | number | boolean | Record<string, string | number | boolean | Record<string, string>[]>[]> {
    const result: Record<string, unknown> = {
      Name: DomainNameLegalRepresentativeAttribute.NAME,
    };

    const nameParts: Record<string, string>[] = [];

    this.value.forEach((rdn) => {
      rdn.forEach((atv) => {
        const value = atv.value.toString();
        nameParts.push({ [atv.type]: value });
      });
    });

    result['Name Parts'] = nameParts;

    return result as Record<
      string,
      string | number | boolean | Record<string, string | number | boolean | Record<string, string>[]>[]
    >;
  }
}
