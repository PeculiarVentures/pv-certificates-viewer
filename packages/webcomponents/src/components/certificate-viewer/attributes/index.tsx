/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

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
import { BasicAttribute } from './basic_attribute';
import { AsStringAttribute } from './as_string_attribute';

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

        if (typeof attribute.value === 'string') {
          return (
            <AsStringAttribute
              attribute={attribute as any}
            />
          );
        }

        return (
          <BasicAttribute
            attribute={attribute}
          />
        );
      } catch (error) {
        console.error('Error render attribute:', attribute.asn.type);

        return null;
      }
    }),
  ]);
};
