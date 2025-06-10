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
import {
  UnstructuredName,
  ChallengePassword,
} from '@peculiar/asn1-pkcs9';
import type { Attribute, TAttributeValue } from '../../../crypto/attribute';
import { RowTitle } from '../row';
import { NameAttribute } from './name_attribute';
import { ActivityDescriptionAttribute } from './activity_description_attribute';
import { WebGdprAttribute } from './web_gdpr_attribute';
import { InsuranceValueAttribute } from './insurance_value_attribute';
import { TypeRelationshipAttribute } from './type_relationship_attribute';
import { ValuationRankingAttribute } from './valuation_ranking_attribute';
import { BasicAttribute } from './basic_attribute';
import { AsStringAttribute } from './as_string_attribute';
import { UnstructuredNameAttribute } from './unstructured_name_attribute';
import { ChallengePasswordAttribute } from './challenge_password_attribute';

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
              attribute={attribute as unknown as Attribute<Name>}
            />
          );
        }

        if (attribute.value instanceof ActivityDescription) {
          return (
            <ActivityDescriptionAttribute
              attribute={attribute as unknown as Attribute<ActivityDescription>}
            />
          );
        }

        if (attribute.value instanceof WebGDPR) {
          return (
            <WebGdprAttribute
              attribute={attribute as unknown as Attribute<WebGDPR>}
            />
          );
        }

        if (attribute.value instanceof InsuranceValue) {
          return (
            <InsuranceValueAttribute
              attribute={attribute as unknown as Attribute<InsuranceValue>}
            />
          );
        }

        if (attribute.value instanceof TypeRelationship) {
          return (
            <TypeRelationshipAttribute
              attribute={attribute as unknown as Attribute<TypeRelationship>}
            />
          );
        }

        if (attribute.value instanceof ValuationRanking) {
          return (
            <ValuationRankingAttribute
              attribute={attribute as unknown as Attribute<ValuationRanking>}
            />
          );
        }

        if (attribute.value instanceof UnstructuredName) {
          return (
            <UnstructuredNameAttribute
              attribute={attribute as unknown as Attribute<UnstructuredName>}
            />
          );
        }

        if (attribute.value instanceof ChallengePassword) {
          return (
            <ChallengePasswordAttribute
              attribute={attribute as unknown as Attribute<ChallengePassword>}
            />
          );
        }

        if (typeof attribute.value === 'string') {
          return (
            <AsStringAttribute
              attribute={attribute as unknown as Attribute<string>}
            />
          );
        }

        return (
          <BasicAttribute
            attribute={attribute}
          />
        );
      } catch {
        console.error('Error render attribute:', attribute.asn.type);

        return null;
      }
    }),
  ]);
};
