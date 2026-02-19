/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Import all attribute classes to trigger their auto-registration with AttributeFactory.
 */
import './challenge_password_attribute';
import './unstructured_name_attribute';
import './extension_request_attribute';
import './insurance_value_attribute';
import './valuation_ranking_attribute';
import './type_relationship_attribute';
import './activity_description_attribute';
import './web_gdpr_attribute';
import './private_key_possession_statement_attribute';
import './domain_name_beneficiary_attribute';
import './domain_name_legal_representative_attribute';
import './domain_name_owner_attribute';
import './domain_name_technical_operator_attribute';

export * from './base_attribute';
export { AttributeFactory } from './attribute_factory';
export * from './challenge_password_attribute';
export * from './unstructured_name_attribute';
export * from './type_relationship_attribute';
export * from './insurance_value_attribute';
export * from './valuation_ranking_attribute';
export * from './activity_description_attribute';
export * from './web_gdpr_attribute';
export * from './extension_request_attribute';
export * from './private_key_possession_statement_attribute';
export * from './domain_name_beneficiary_attribute';
export * from './domain_name_legal_representative_attribute';
export * from './domain_name_owner_attribute';
export * from './domain_name_technical_operator_attribute';
