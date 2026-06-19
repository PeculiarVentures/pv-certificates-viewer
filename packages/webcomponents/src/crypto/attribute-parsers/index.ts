/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Attribute as AsnAttribute } from '@peculiar/asn1-x509';
import { parseAttribute as _parseAttribute } from './parse';
import { AttributeParserRegistry } from './registry';
import {
  DomainNameBeneficiaryParser,
  DomainNameLegalRepresentativeParser,
  DomainNameOwnerParser,
  DomainNameTechnicalOperatorParser,
} from './parsers/domain_name';
import { TypeRelationshipParser } from './parsers/type_relationship';
import { ActivityDescriptionParser } from './parsers/activity_description';
import { WebGDPRParser } from './parsers/web_gdpr';
import { InsuranceValueParser } from './parsers/insurance_value';
import { ValuationRankingParser } from './parsers/valuation_ranking';
import {
  ChallengePasswordParser,
  UnstructuredNameParser,
  ExtensionRequestParser,
} from './parsers/pkcs9';
import { PrivateKeyPossessionStatementParser } from './parsers/private_key_possession_statement';
import type { IParsedAttribute } from './types';

export const registry = new AttributeParserRegistry();

// ntQWAC domain name attributes
registry.register(new DomainNameBeneficiaryParser());
registry.register(new DomainNameLegalRepresentativeParser());
registry.register(new DomainNameOwnerParser());
registry.register(new DomainNameTechnicalOperatorParser());

// ntQWAC complex attributes
registry.register(new TypeRelationshipParser());
registry.register(new ActivityDescriptionParser());
registry.register(new WebGDPRParser());
registry.register(new InsuranceValueParser());
registry.register(new ValuationRankingParser());

// PKCS#9 attributes
registry.register(new ChallengePasswordParser());
registry.register(new UnstructuredNameParser());
registry.register(new ExtensionRequestParser());

// Private Key Possession Statement
registry.register(new PrivateKeyPossessionStatementParser());

export function parseAttribute(attribute: AsnAttribute): IParsedAttribute {
  return _parseAttribute(attribute, registry);
}

export * from './types';
export { AttributeParserRegistry } from './registry';
export {
  DomainNameBeneficiaryParser,
  DomainNameLegalRepresentativeParser,
  DomainNameOwnerParser,
  DomainNameTechnicalOperatorParser,
} from './parsers/domain_name';
export { TypeRelationshipParser } from './parsers/type_relationship';
export { ActivityDescriptionParser } from './parsers/activity_description';
export { WebGDPRParser } from './parsers/web_gdpr';
export { InsuranceValueParser } from './parsers/insurance_value';
export { ValuationRankingParser } from './parsers/valuation_ranking';
export {
  ChallengePasswordParser,
  UnstructuredNameParser,
  ExtensionRequestParser,
} from './parsers/pkcs9';
export { PrivateKeyPossessionStatementParser } from './parsers/private_key_possession_statement';
