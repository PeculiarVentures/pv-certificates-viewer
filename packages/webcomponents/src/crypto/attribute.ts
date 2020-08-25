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

import { AsnData } from './asn_data';

export type TAttributeValue = DomainNameBeneficiary
| DomainNameLegalRepresentative
| DomainNameOwner
| DomainNameTechnicalOperator
| TypeRelationship
| ActivityDescription
| WebGDPR
| InsuranceValue
| ValuationRanking
| string;

export class Attribute<T extends TAttributeValue> extends AsnData<AsnAttribute> {
  public readonly value: T;

  private getAsnExtnValue() {
    return this.asn.values[0];
  }

  constructor(raw: BufferSource) {
    super(raw, AsnAttribute);

    const asnExtnValue = this.getAsnExtnValue();

    switch (this.asn.type) {
      case id_DomainNameBeneficiary:
        this.value = AsnParser.parse(asnExtnValue, DomainNameBeneficiary) as T;
        break;
      case id_DomainNameLegalRepresentative:
        this.value = AsnParser.parse(asnExtnValue, DomainNameLegalRepresentative) as T;
        break;
      case id_DomainNameOwner:
        this.value = AsnParser.parse(asnExtnValue, DomainNameOwner) as T;
        break;
      case id_DomainNameTechnicalOperator:
        this.value = AsnParser.parse(asnExtnValue, DomainNameTechnicalOperator) as T;
        break;
      case id_TypeRelationship:
        this.value = AsnParser.parse(asnExtnValue, TypeRelationship) as T;
        break;
      case id_ActivityDescription:
        this.value = AsnParser.parse(asnExtnValue, ActivityDescription) as T;
        break;
      case id_WebGDPR:
        this.value = AsnParser.parse(asnExtnValue, WebGDPR) as T;
        break;
      case id_InsuranceValue:
        this.value = AsnParser.parse(asnExtnValue, InsuranceValue) as T;
        break;
      case id_ValuationRanking:
        this.value = AsnParser.parse(asnExtnValue, ValuationRanking) as T;
        break;
      default:
        this.value = Convert.ToHex(asnExtnValue) as T;
    }
  }
}
