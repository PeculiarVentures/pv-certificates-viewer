/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import {
  KeyUsage,
  BasicConstraints,
  ExtendedKeyUsage,
  SubjectKeyIdentifier,
  AuthorityKeyIdentifier,
  CRLDistributionPoints,
  AuthorityInfoAccessSyntax,
  SubjectAlternativeName,
  CertificatePolicies,
  NameConstraints,
  CRLReason,
  CRLNumber,
  SubjectDirectoryAttributes,
  PrivateKeyUsagePeriod,
  EntrustVersionInfo,
  PolicyConstraints,
  PolicyMappings,
  SubjectInfoAccessSyntax,
  IssuingDistributionPoint,
} from '@peculiar/asn1-x509';
import { CertificateTransparency } from '@peculiar/asn1-cert-transparency';
import {
  CertificateTemplate,
  EnrollCertTypeChoice,
  CaVersion,
} from '@peculiar/asn1-x509-microsoft';
import { QCStatements, BiometricSyntax } from '@peculiar/asn1-x509-qualified';
import { NetscapeComment, NetscapeCertType } from '@peculiar/asn1-x509-netscape';
import { LeiRole, LeiChoice } from '@peculiar/asn1-lei';
import { Timestamp, ArchiveRevInfo } from '@peculiar/asn1-adobe-acrobat';
import { LogotypeExtn } from '@peculiar/asn1-x509-logotype';
import { TNAuthorizationList } from '@peculiar/asn1-rfc8226';
import { NonStandardKeyDescription } from '@peculiar/asn1-android';

import { RowTitle } from '../row';
import { Extension, TExtensionValue } from '../../../crypto/extension';
import {
  CabforganizationIdentifier,
} from '../../../crypto/extensions';

import { KeyUsageExtension } from './key_usage_extension';
import { BasicConstraintsExtension } from './basic_constraints_extension';
import { ExtendedKeyUsageExtension } from './extended_key_usage_extension';
import { SubjectKeyIdentifierExtension } from './subject_key_identifier_extension';
import { AuthorityKeyIdentifierExtension } from './authority_key_identifier_extension';
import { CRLDistributionPointsExtension } from './crl_distribution_points_extension';
import { InfoAccessSyntaxExtension } from './info_access_syntax_extension';
import { SubjectAlternativeNameExtension } from './subject_alternative_name_extension';
import { CertificatePoliciesExtension } from './certificate_policies_extension';
import { CertificateTransparencyExtension } from './certificate_transparency_extension';
import { NameConstraintsExtension } from './name_constraints_extension';
import { CertificateTemplateExtension } from './certificate_template_extension';
import { EnrollCertTypeChoiceExtension } from './enroll_cert_type_extension';
import { CaVersionExtension } from './ca_version_extension';
import { QCStatementsExtension } from './qc_statements_extension';
import { NetscapeCommentExtension } from './netscape_comment_extension';
import { NetscapeCertTypeExtension } from './netscape_cert_type_extension';
import { LeiRoleExtension } from './lei_role_extennsion';
import { LeiExtension } from './lei_extension';
import { TimestampExtension } from './timestamp_extension';
import { ArchiveRevInfoExtension } from './archive_rev_info_extension';
import { CRLReasonExtension } from './crl_reason_extension';
import { SubjectDirectoryAttributesExtension } from './subject_directory_attributes_extension';
import { AsStringExtension } from './as_string_extension';
import { BasicExtension } from './basic_extension';
import { PrivateKeyUsagePeriodExtension } from './private_key_usage_period_extension';
import { EntrustVersionInfoExtension } from './entrust_version_info_extension';
import { BiometricSyntaxExtension } from './biometric_syntax_extension';
import { LogotypeExtension } from './logotype_extension';
import { TNAuthListExtension } from './tn_auth_list_extension';
import { PolicyConstraintsExtension } from './policy_constraints_extension';
import { PolicyMappingsExtension } from './policy_mappings_extension';
import { CRLNumberExtension } from './crl_number_extension';
import { IssuingDistributionPointExtension } from './issuing_distribution_point_extension';
import { KeyDescriptionExtension } from './key_description_extension';
import { CabforganizationIdentifierExtension } from './cabforganization_identifier_extension';

interface IExtensionsProps extends
  IGeneralNameOptions,
  ILeiOptions,
  IAuthorityKeyIdentifierOptions,
  ISubjectKeyIdentifierOptions {
  extensions: Extension<TExtensionValue>[];
  title?: string;
}

export const Extensions: FunctionalComponent<IExtensionsProps> = (props) => {
  const { extensions, title } = props;

  if (!extensions || !extensions.length) {
    return null;
  }

  return ([
    <RowTitle
      value={title || 'Extensions'}
    />,
    extensions.map((extension) => {
      try {
        if (extension.value instanceof KeyUsage) {
          return (
            <KeyUsageExtension
              extension={extension as any}
            />
          );
        }

        if (extension.value instanceof BasicConstraints) {
          return (
            <BasicConstraintsExtension
              extension={extension as any}
            />
          );
        }

        if (extension.value instanceof ExtendedKeyUsage) {
          return (
            <ExtendedKeyUsageExtension
              extension={extension as any}
            />
          );
        }

        if (extension.value instanceof SubjectKeyIdentifier) {
          return (
            <SubjectKeyIdentifierExtension
              extension={extension as any}
              {...props}
            />
          );
        }

        if (extension.value instanceof AuthorityKeyIdentifier) {
          return (
            <AuthorityKeyIdentifierExtension
              extension={extension as any}
              {...props}
            />
          );
        }

        if (extension.value instanceof CRLDistributionPoints) {
          return (
            <CRLDistributionPointsExtension
              extension={extension as any}
              {...props}
            />
          );
        }

        if (
          extension.value instanceof AuthorityInfoAccessSyntax
          || extension.value instanceof SubjectInfoAccessSyntax
        ) {
          return (
            <InfoAccessSyntaxExtension
              extension={extension as any}
              {...props}
            />
          );
        }

        if (extension.value instanceof SubjectAlternativeName) {
          return (
            <SubjectAlternativeNameExtension
              extension={extension as any}
              {...props}
            />
          );
        }

        if (extension.value instanceof CertificatePolicies) {
          return (
            <CertificatePoliciesExtension
              extension={extension as any}
            />
          );
        }

        if (extension.value instanceof CertificateTransparency) {
          return (
            <CertificateTransparencyExtension
              extension={extension as any}
            />
          );
        }

        if (extension.value instanceof NameConstraints) {
          return (
            <NameConstraintsExtension
              extension={extension as any}
              {...props}
            />
          );
        }

        if (extension.value instanceof CertificateTemplate) {
          return (
            <CertificateTemplateExtension
              extension={extension as any}
            />
          );
        }

        if (extension.value instanceof EnrollCertTypeChoice) {
          return (
            <EnrollCertTypeChoiceExtension
              extension={extension as any}
            />
          );
        }

        if (extension.value instanceof CaVersion) {
          return (
            <CaVersionExtension
              extension={extension as any}
            />
          );
        }

        if (extension.value instanceof QCStatements) {
          return (
            <QCStatementsExtension
              extension={extension as any}
            />
          );
        }

        if (extension.value instanceof NetscapeComment) {
          return (
            <NetscapeCommentExtension
              extension={extension as any}
            />
          );
        }

        if (extension.value instanceof NetscapeCertType) {
          return (
            <NetscapeCertTypeExtension
              extension={extension as any}
            />
          );
        }

        if (extension.value instanceof LeiRole) {
          return (
            <LeiRoleExtension
              extension={extension as any}
            />
          );
        }

        if (extension.value instanceof LeiChoice) {
          return (
            <LeiExtension
              extension={extension as any}
              {...props}
            />
          );
        }

        if (extension.value instanceof Timestamp) {
          return (
            <TimestampExtension
              extension={extension as any}
              {...props}
            />
          );
        }

        if (extension.value instanceof ArchiveRevInfo) {
          return (
            <ArchiveRevInfoExtension
              extension={extension as any}
            />
          );
        }

        if (extension.value instanceof CRLReason) {
          return (
            <CRLReasonExtension
              extension={extension as any}
            />
          );
        }

        if (extension.value instanceof SubjectDirectoryAttributes) {
          return (
            <SubjectDirectoryAttributesExtension
              extension={extension as any}
            />
          );
        }

        if (extension.value instanceof PrivateKeyUsagePeriod) {
          return (
            <PrivateKeyUsagePeriodExtension
              extension={extension as any}
            />
          );
        }

        if (extension.value instanceof EntrustVersionInfo) {
          return (
            <EntrustVersionInfoExtension
              extension={extension as any}
            />
          );
        }

        if (extension.value instanceof BiometricSyntax) {
          return (
            <BiometricSyntaxExtension
              extension={extension as any}
            />
          );
        }

        if (extension.value instanceof LogotypeExtn) {
          return (
            <LogotypeExtension
              extension={extension as any}
            />
          );
        }

        if (extension.value instanceof TNAuthorizationList) {
          return (
            <TNAuthListExtension
              extension={extension as any}
            />
          );
        }

        if (extension.value instanceof PolicyConstraints) {
          return (
            <PolicyConstraintsExtension
              extension={extension as any}
            />
          );
        }

        if (extension.value instanceof PolicyMappings) {
          return (
            <PolicyMappingsExtension
              extension={extension as any}
            />
          );
        }

        if (extension.value instanceof CRLNumber) {
          return (
            <CRLNumberExtension
              extension={extension as any}
            />
          );
        }

        if (extension.value instanceof IssuingDistributionPoint) {
          return (
            <IssuingDistributionPointExtension
              extension={extension as any}
              {...props}
            />
          );
        }

        if (extension.value instanceof NonStandardKeyDescription) {
          return (
            <KeyDescriptionExtension
              extension={extension as any}
              {...props}
            />
          );
        }

        if (extension.value instanceof CabforganizationIdentifier) {
          return (
            <CabforganizationIdentifierExtension
              extension={extension as any}
              {...props}
            />
          );
        }

        if (typeof extension.value === 'string') {
          return (
            <AsStringExtension
              extension={extension as any}
            />
          );
        }

        return (
          <BasicExtension
            extension={extension}
          />
        );
      } catch (error) {
        console.error('Error render extension:', extension.asn.extnID);

        return null;
      }
    }),
  ]);
};
