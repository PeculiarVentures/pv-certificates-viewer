/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Convert } from 'pvtsutils';
import { AsnParser } from '@peculiar/asn1-schema';
import { Attribute as AsnAttribute } from '@peculiar/asn1-x509';
import {
  id_DomainNameBeneficiary,
  DomainNameBeneficiary,

  id_DomainNameLegalRepresentative,
  DomainNameLegalRepresentative,

  id_DomainNameOwner,
  DomainNameOwner,

  id_DomainNameTechnicalOperator,
  DomainNameTechnicalOperator,

  id_TypeRelationship,
  TypeRelationship,

  id_ActivityDescription,
  ActivityDescription,

  id_WebGDPR,
  WebGDPR,

  id_InsuranceValue,
  InsuranceValue,

  id_ValuationRanking,
  ValuationRanking,
} from '@peculiar/asn1-ntqwac';
import {
  id_pkcs9_at_extensionRequest,
  ExtensionRequest,

  id_pkcs9_at_challengePassword,
  ChallengePassword,

  id_pkcs9_at_unstructuredName,
  UnstructuredName,
} from '@peculiar/asn1-pkcs9';

import { AsnData } from './asn_data';

const attributesParsers = {
  [id_DomainNameBeneficiary]: DomainNameBeneficiary,
  [id_DomainNameLegalRepresentative]: DomainNameLegalRepresentative,
  [id_DomainNameOwner]: DomainNameOwner,
  [id_DomainNameTechnicalOperator]: DomainNameTechnicalOperator,
  [id_TypeRelationship]: TypeRelationship,
  [id_ActivityDescription]: ActivityDescription,
  [id_WebGDPR]: WebGDPR,
  [id_InsuranceValue]: InsuranceValue,
  [id_ValuationRanking]: ValuationRanking,
  [id_pkcs9_at_challengePassword]: ChallengePassword,
  [id_pkcs9_at_unstructuredName]: UnstructuredName,
  [id_pkcs9_at_extensionRequest]: ExtensionRequest,
};

type TAttributeKeys = keyof typeof attributesParsers;
export type TAttributeValue = InstanceType<typeof attributesParsers[TAttributeKeys]> | string;

export class Attribute<T extends TAttributeValue> extends AsnData<AsnAttribute> {
  public readonly value: T;

  private getAsnExtnValue() {
    return this.asn.values[0];
  }

  constructor(raw: BufferSource) {
    super(raw, AsnAttribute);

    const asnExtnValue = this.getAsnExtnValue();

    try {
      const target = attributesParsers[this.asn.type];

      if (target) {
        this.value = AsnParser.parse<T>(asnExtnValue, target);
      } else {
        console.warn(`Didn't detect parser for "${this.asn.type}" attribute.`);

        this.value = Convert.ToHex(asnExtnValue) as T;
      }
    } catch (error) {
      console.error(`Error parse "${this.asn.type}" attribute:`, error.message);

      this.value = Convert.ToHex(asnExtnValue) as T;
    }
  }
}
