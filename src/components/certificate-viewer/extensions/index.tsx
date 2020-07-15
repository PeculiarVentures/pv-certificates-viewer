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
} from '@peculiar/asn1-x509';
import { CertificateTransparency } from '@peculiar/asn1-cert-transparency';
import {
  CertificateTemplate,
  EnrollCertTypeChoice,
  CaVersion,
} from '@peculiar/asn1-x509-microsoft';
import { QCStatements } from '@peculiar/asn1-x509-qualified';
import { NetscapeComment, NetscapeCertType } from '@peculiar/asn1-x509-netscape';
import { LeiRoles, LeiChoice } from '@peculiar/asn1-lei';
import { Timestamp, ArchiveRevInfo } from '@peculiar/asn1-adobe-acrobat';

import { rowTitle } from '../row_title';
import { Extension } from '../../../crypto/extension';

import { basic } from './basic';
import { keyUsage } from './key_usage';
import { basicConstraints } from './basic_constraints';
import { extendedKeyUsage } from './extended_key_usage';
import { subjectKeyIdentifier } from './subject_key_identifier';
import { authorityKeyIdentifier } from './authority_key_identifier';
import { crlDistributionPoints } from './crl_distribution_points';
import { authorityInfoAccessSyntax } from './authority_info_access_syntax';
import { subjectAlternativeName } from './subject_alternative_name';
import { certificatePolicies } from './certificate_policies';
import { certificateTransparency } from './certificate_transparency';
import { asString } from './as_string';
import { nameConstraints } from './name_constraints';
import { certificateTemplate } from './certificate_template';
import { enrollCertType } from './enroll_cert_type';
import { caVersion } from './ca_version';
import { qcStatements } from './qc_statements';
import { netscapeComment } from './netscape_comment';
import { netscapeCertType } from './netscape_cert_type';
import { leiRoles } from './lei_roles';
import { lei } from './lei';
import { timestamp } from './timestamp';
import { archiveRevInfo } from './archive_rev_info';
import { crlReason } from './crl_reason';

export function extensions(extensions: Extension[]) {
  if (!extensions || !extensions.length) {
    return null;
  }

  return ([
    rowTitle('Extensions'),
    extensions.map((extension) => {
      try {
        if (extension.value instanceof KeyUsage) {
          return keyUsage(extension, extension.value);
        }

        if (extension.value instanceof BasicConstraints) {
          return basicConstraints(extension, extension.value);
        }

        if (extension.value instanceof ExtendedKeyUsage) {
          return extendedKeyUsage(extension, extension.value);
        }

        if (extension.value instanceof SubjectKeyIdentifier) {
          return subjectKeyIdentifier(extension, extension.value);
        }

        if (extension.value instanceof AuthorityKeyIdentifier) {
          return authorityKeyIdentifier(extension, extension.value);
        }

        if (extension.value instanceof CRLDistributionPoints) {
          return crlDistributionPoints(extension, extension.value);
        }

        if (extension.value instanceof AuthorityInfoAccessSyntax) {
          return authorityInfoAccessSyntax(extension, extension.value);
        }

        if (extension.value instanceof SubjectAlternativeName) {
          return subjectAlternativeName(extension, extension.value);
        }

        if (extension.value instanceof CertificatePolicies) {
          return certificatePolicies(extension, extension.value);
        }

        if (extension.value instanceof CertificateTransparency) {
          return certificateTransparency(extension, extension.value);
        }

        if (extension.value instanceof NameConstraints) {
          return nameConstraints(extension, extension.value);
        }

        if (extension.value instanceof CertificateTemplate) {
          return certificateTemplate(extension, extension.value);
        }

        if (extension.value instanceof EnrollCertTypeChoice) {
          return enrollCertType(extension, extension.value);
        }

        if (extension.value instanceof CaVersion) {
          return caVersion(extension, extension.value);
        }

        if (extension.value instanceof QCStatements) {
          return qcStatements(extension, extension.value);
        }

        if (extension.value instanceof NetscapeComment) {
          return netscapeComment(extension, extension.value);
        }

        if (extension.value instanceof NetscapeCertType) {
          return netscapeCertType(extension, extension.value);
        }

        if (extension.value instanceof LeiRoles) {
          return leiRoles(extension, extension.value);
        }

        if (extension.value instanceof LeiChoice) {
          return lei(extension, extension.value);
        }

        if (extension.value instanceof Timestamp) {
          return timestamp(extension, extension.value);
        }

        if (extension.value instanceof ArchiveRevInfo) {
          return archiveRevInfo(extension, extension.value);
        }

        if (extension.value instanceof CRLReason) {
          return crlReason(extension, extension.value);
        }

        if (typeof extension.value === 'string') {
          return asString(extension, extension.value);
        }

        return basic(extension);
      } catch (error) {
        console.error('Error render extension:', extension.asn.extnID);

        return null;
      }
    }),
  ]);
}
