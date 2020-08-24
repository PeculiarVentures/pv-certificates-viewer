import { h, FunctionalComponent } from '@stencil/core';
import { Name } from '@peculiar/asn1-x509';

import {
  TypeRelationship,
  ActivityDescription,
  WebGDPR,
  InsuranceValue,
  ValuationRanking,
} from '@peculiar/asn1-ntqwac';

import { RowTitle } from '../row';
import type { Attribute, TAttributeValue } from '../../../crypto/attribute';
import { NameAttribute } from './name_attribute';
import { ActivityDescriptionAttribute } from './activity_description_attribute';
import { WebGdprAttribute } from './web_gdpr_attribute';
import { InsuranceValueAttribute } from './insurance_value_attribute';
import { TypeRelationshipAttribute } from './type_relationship_attribute';
import { ValuationRankingAttribute } from './valuation_ranking_attribute';

interface IAttributesPtops extends
  IGeneralNameOptions,
  ILeiOptions,
  IAuthorityKeyIdentifierOptions,
  ISubjectKeyIdentifierOptions {
  attributes: Attribute<TAttributeValue>[];
}

export const Attributes: FunctionalComponent<IAttributesPtops> = (props) => {
  const { attributes } = props;

  if (!attributes || !attributes.length) {
    return null;
  }

  return ([
    <RowTitle
      value="Attributes"
    />,
    attributes.map((attribute) => {
      try {
        if (attribute.value instanceof Name) {
          return (
            <NameAttribute
              attribute={attribute as any}
            />
          );
        }

        if (attribute.value instanceof ActivityDescription) {
          return (
            <ActivityDescriptionAttribute
              attribute={attribute as any}
            />
          );
        }

        if (attribute.value instanceof WebGDPR) {
          return (
            <WebGdprAttribute
              attribute={attribute as any}
            />
          );
        }

        if (attribute.value instanceof InsuranceValue) {
          return (
            <InsuranceValueAttribute
              attribute={attribute as any}
            />
          );
        }

        if (attribute.value instanceof TypeRelationship) {
          return (
            <TypeRelationshipAttribute
              attribute={attribute as any}
            />
          );
        }

        if (attribute.value instanceof ValuationRanking) {
          return (
            <ValuationRankingAttribute
              attribute={attribute as any}
            />
          );
        }

        return null;
      } catch (error) {
        console.error('Error render extension:', attribute.asn.type);

        return null;
      }
    }),
  ]);
};
