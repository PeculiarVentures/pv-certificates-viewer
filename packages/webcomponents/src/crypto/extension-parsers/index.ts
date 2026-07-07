/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Extension } from '@peculiar/asn1-x509';
import { parseExtension as _parseExtension } from './parse';
import { ExtensionParserRegistry } from './registry';
import { BasicConstraintsParser } from './parsers/basic_constraints';
import { KeyUsageParser } from './parsers/key_usage';
import { AuthorityKeyIdentifierParser } from './parsers/authority_key_identifier';
import { CertificatePoliciesParser } from './parsers/certificate_policies';
import { SubjectKeyIdentifierParser } from './parsers/subject_key_identifier';
import { CRLDistributionPointsParser } from './parsers/crl_distribution_points';
import { AuthorityInformationAccessParser } from './parsers/authority_information_access';
import { PolicyMappingsParser } from './parsers/policy_mappings';
import { NameConstraintsParser } from './parsers/name_constraints';
import { PolicyConstraintsParser } from './parsers/policy_constraints';
import { SubjectAlternativeNameParser } from './parsers/subject_alternative_name';
import { IssuerAlternativeNameParser } from './parsers/issuer_alternative_name';
import { CertificateIssuerParser } from './parsers/certificate_issuer';
import { ExtendedKeyUsageParser } from './parsers/extended_key_usage';
import { SubjectInfoAccessParser } from './parsers/subject_info_access';
import { InhibitAnyPolicyParser } from './parsers/inhibit_any_policy';
import { InvalidityDateParser } from './parsers/invalidity_date';
import { PrivateKeyUsagePeriodParser } from './parsers/private_key_usage_period';
import { CRLNumberParser, CRLDeltaIndicatorParser } from './parsers/crl_number';
import { CRLReasonParser } from './parsers/crl_reason';
import { EntrustVersionInfoParser } from './parsers/entrust_version_info';
import { SubjectDirectoryAttributesParser } from './parsers/subject_directory_attributes';
import { IssuingDistributionPointParser } from './parsers/issuing_distribution_point';
import { NetscapeCommentParser, NetscapeCertTypeParser } from './parsers/netscape';
import { CertificateTransparencyParser } from './parsers/certificate_transparency';
import { BiometricInfoParser } from './parsers/biometric_info';
import { QCStatementsParser } from './parsers/qc_statements';
import { KeyDescriptionParser } from './parsers/key_description';
import {
  CertificateTemplateParser, EnrollCertTypeParser, CaVersionParser, CRLNextPublishParser,
} from './parsers/microsoft';
import { LeiParser, LeiRoleParser } from './parsers/lei';
import { AdobeTimestampParser, AdobeArchiveRevInfoParser } from './parsers/adobe_acrobat';
import { LogotypeParser } from './parsers/logotype';
import { TNAuthorizationListParser } from './parsers/tn_auth_list';
import { CabfOrganizationIdentifierParser, AppleDeveloperIdDateParser } from './parsers/cabf_and_apple';
import type { IParsedExtension } from './types';

export const registry = new ExtensionParserRegistry();

// Certificate extensions (RFC 5280)
registry.register(new BasicConstraintsParser());
registry.register(new KeyUsageParser());
registry.register(new ExtendedKeyUsageParser());
registry.register(new SubjectAlternativeNameParser());
registry.register(new IssuerAlternativeNameParser());
registry.register(new SubjectKeyIdentifierParser());
registry.register(new AuthorityKeyIdentifierParser());
registry.register(new AuthorityInformationAccessParser());
registry.register(new SubjectInfoAccessParser());
registry.register(new CertificatePoliciesParser());
registry.register(new PolicyMappingsParser());
registry.register(new PolicyConstraintsParser());
registry.register(new NameConstraintsParser());
registry.register(new InhibitAnyPolicyParser());
registry.register(new PrivateKeyUsagePeriodParser());
registry.register(new SubjectDirectoryAttributesParser());
registry.register(new CertificateIssuerParser());

// CRL extensions
registry.register(new CRLDistributionPointsParser());
registry.register(new CRLNumberParser());
registry.register(new CRLDeltaIndicatorParser());
registry.register(new CRLReasonParser());
registry.register(new IssuingDistributionPointParser());
registry.register(new InvalidityDateParser());

// Proprietary / additional
registry.register(new EntrustVersionInfoParser());
registry.register(new NetscapeCommentParser());
registry.register(new NetscapeCertTypeParser());
registry.register(new CertificateTransparencyParser());
registry.register(new BiometricInfoParser());
registry.register(new QCStatementsParser());
registry.register(new KeyDescriptionParser());

// Microsoft extensions
registry.register(new CertificateTemplateParser());
registry.register(new EnrollCertTypeParser());
registry.register(new CaVersionParser());
registry.register(new CRLNextPublishParser());

// LEI extensions (RFC 7773)
registry.register(new LeiParser());
registry.register(new LeiRoleParser());

// Adobe Acrobat extensions
registry.register(new AdobeTimestampParser());
registry.register(new AdobeArchiveRevInfoParser());

// Logotype extension (RFC 3709)
registry.register(new LogotypeParser());

// TN Authorization List (RFC 8226)
registry.register(new TNAuthorizationListParser());

// CA/Browser Forum + Apple
registry.register(new CabfOrganizationIdentifierParser());
registry.register(new AppleDeveloperIdDateParser());

export function parseExtension(extension: Extension): IParsedExtension {
  return _parseExtension(extension, registry);
}

export * from './types';
export * from './builders';
export * from './unknown';
export { ExtensionParserRegistry } from './registry';
export { BasicConstraintsParser } from './parsers/basic_constraints';
export { KeyUsageParser } from './parsers/key_usage';
export { ExtendedKeyUsageParser } from './parsers/extended_key_usage';
export { SubjectAlternativeNameParser } from './parsers/subject_alternative_name';
export { IssuerAlternativeNameParser } from './parsers/issuer_alternative_name';
export { SubjectKeyIdentifierParser } from './parsers/subject_key_identifier';
export { AuthorityKeyIdentifierParser } from './parsers/authority_key_identifier';
export { AuthorityInformationAccessParser } from './parsers/authority_information_access';
export { SubjectInfoAccessParser } from './parsers/subject_info_access';
export { CertificatePoliciesParser } from './parsers/certificate_policies';
export { PolicyMappingsParser } from './parsers/policy_mappings';
export { PolicyConstraintsParser } from './parsers/policy_constraints';
export { NameConstraintsParser } from './parsers/name_constraints';
export { InhibitAnyPolicyParser } from './parsers/inhibit_any_policy';
export { PrivateKeyUsagePeriodParser } from './parsers/private_key_usage_period';
export { SubjectDirectoryAttributesParser } from './parsers/subject_directory_attributes';
export { CertificateIssuerParser } from './parsers/certificate_issuer';
export { CRLDistributionPointsParser } from './parsers/crl_distribution_points';
export { CRLNumberParser, CRLDeltaIndicatorParser } from './parsers/crl_number';
export { CRLReasonParser } from './parsers/crl_reason';
export { IssuingDistributionPointParser } from './parsers/issuing_distribution_point';
export { InvalidityDateParser } from './parsers/invalidity_date';
export { EntrustVersionInfoParser } from './parsers/entrust_version_info';
export { NetscapeCommentParser, NetscapeCertTypeParser } from './parsers/netscape';
export { CertificateTransparencyParser } from './parsers/certificate_transparency';
export { BiometricInfoParser } from './parsers/biometric_info';
export { QCStatementsParser } from './parsers/qc_statements';
export { KeyDescriptionParser } from './parsers/key_description';
export {
  CertificateTemplateParser, EnrollCertTypeParser, CaVersionParser, CRLNextPublishParser,
} from './parsers/microsoft';
export { LeiParser, LeiRoleParser } from './parsers/lei';
export { AdobeTimestampParser, AdobeArchiveRevInfoParser } from './parsers/adobe_acrobat';
export { LogotypeParser } from './parsers/logotype';
export { TNAuthorizationListParser } from './parsers/tn_auth_list';
export { CabfOrganizationIdentifierParser, AppleDeveloperIdDateParser } from './parsers/cabf_and_apple';
