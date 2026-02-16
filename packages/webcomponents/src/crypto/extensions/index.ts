/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Import all extension classes to trigger their auto-registration with ExtensionFactory.
 * Each extension file registers itself when imported.
 */
import './subject_alternative_name_extension';
import './key_usage_extension';
import './basic_constraints_extension';
import './subject_key_identifier_extension';
import './authority_key_identifier_extension';
import './certificate_policies_extension';
import './extended_key_usage_extension';
import './issuer_alternative_name_extension';
import './crl_distribution_points_extension';
import './private_key_usage_period_extension';
import './name_constraints_extension';
import './policy_constraints_extension';
import './policy_mappings_extension';
import './inhibit_any_policy_extension';
import './crl_number_extension';
import './delta_crl_indicator_extension';
import './crl_reason_extension';
import './invalidity_date_extension';
import './certificate_issuer_extension';
import './issuing_distribution_point_extension';
import './subject_directory_attributes_extension';
import './authority_info_access_syntax_extension';
import './subject_info_access_syntax_extension';
import './qc_statements_extension';
import './biometric_syntax_extension';
import './logotype_extension';
import './netscape_comment_extension';
import './netscape_cert_type_extension';
import './lei_role_extension';
import './lei_choice_extension';
import './certificate_transparency_extension';
import './timestamp_extension';
import './archive_rev_info_extension';
import './tn_authorization_list_extension';
import './key_description_extension';
import './certificate_template_extension';
import './enroll_cert_type_choice_extension';
import './ca_version_extension';
import './entrust_version_info_extension';
import './cabforganization_identifier_extension';

export { ExtensionFactory } from './extension_factory';
