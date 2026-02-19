/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { DomainNameBeneficiary, id_DomainNameBeneficiary } from '@peculiar/asn1-ntqwac';
import { AsnParser } from '@peculiar/asn1-schema';
import { ArrayFlat } from '../../components/certificate-details-parts';
import { getStringByOID } from '../../utils';
import { AttributeFactory } from './attribute_factory';
import { BaseAttribute } from './base_attribute';

/**
 * Domain Name Beneficiary Attribute
 */
export class DomainNameBeneficiaryAttribute extends BaseAttribute {
  public static override readonly NAME = 'Domain Name Beneficiary';

  public readonly value: DomainNameBeneficiary;

  constructor(raw: BufferSource) {
    super(raw);

    const asnAttrValue = this.asn.values[0];

    this.value = AsnParser.parse<DomainNameBeneficiary>(asnAttrValue, DomainNameBeneficiary);
  }

  public override toJSON() {
    return this.attrJson({
      Names: ArrayFlat.from(this.value.flat().map((atv) => (
        { [getStringByOID(atv.type, true)]: atv.value.toString() }
      ))),
    });
  }
}

AttributeFactory.register(id_DomainNameBeneficiary, DomainNameBeneficiaryAttribute);
