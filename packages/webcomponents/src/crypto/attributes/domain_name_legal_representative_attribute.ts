/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { DomainNameLegalRepresentative, id_DomainNameLegalRepresentative } from '@peculiar/asn1-ntqwac';
import { AsnParser } from '@peculiar/asn1-schema';
import { getStringByOID } from '../../utils';
import { ArrayFlat } from '../../components/certificate-details-parts';
import { AttributeFactory } from './attribute_factory';
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

  public override toJSON() {
    return this.attrJson({
      Names: ArrayFlat.from(this.value.flat().map((atv) => (
        { [getStringByOID(atv.type, true)]: atv.value.toString() }
      ))),
    });
  }
}

AttributeFactory.register(id_DomainNameLegalRepresentative, DomainNameLegalRepresentativeAttribute);
