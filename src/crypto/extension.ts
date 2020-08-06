import { Convert } from 'pvtsutils';
import {
  Extension as AsnExtension,

  id_pe_authorityInfoAccess,
  AuthorityInfoAccessSyntax,

  id_ce_authorityKeyIdentifier,
  AuthorityKeyIdentifier,

  id_ce_basicConstraints,
  BasicConstraints,

  id_ce_certificateIssuer,
  CertificateIssuer,

  id_ce_certificatePolicies,
  CertificatePolicies,

  id_ce_cRLDistributionPoints,
  CRLDistributionPoints,

  id_ce_cRLReasons,
  CRLReason,

  id_ce_extKeyUsage,
  ExtendedKeyUsage,

  id_ce_inhibitAnyPolicy,
  InhibitAnyPolicy,

  id_ce_invalidityDate,
  InvalidityDate,

  id_ce_issuerAltName,
  IssueAlternativeName,

  id_ce_keyUsage,
  KeyUsage,

  id_ce_nameConstraints,
  NameConstraints,

  id_ce_policyConstraints,
  PolicyConstraints,

  id_ce_policyMappings,
  PolicyMappings,

  id_ce_subjectAltName,
  SubjectAlternativeName,

  id_ce_subjectDirectoryAttributes,
  SubjectDirectoryAttributes,

  id_ce_subjectKeyIdentifier,
  SubjectKeyIdentifier,
 } from '@peculiar/asn1-x509';
import {
  id_pe_qcStatements,
  QCStatements,
} from '@peculiar/asn1-x509-qualified';
import {
  id_certificateTemplate,
  CertificateTemplate,

  id_enrollCertType,
  EnrollCertTypeChoice,

  id_caVersion,
  CaVersion,
} from '@peculiar/asn1-x509-microsoft';
import {
  id_netscapeComment,
  NetscapeComment,

  id_netscapeCertType,
  NetscapeCertType,
} from '@peculiar/asn1-x509-netscape';
import { AsnParser } from '@peculiar/asn1-schema';
import {
  id_lei,
  LeiChoice,

  id_lei_roles,
  LeiRoles,
} from '@peculiar/asn1-lei';
import {
  id_certificateTransparency,
  CertificateTransparency,
} from '@peculiar/asn1-cert-transparency';
import {
  id_adbe_timestamp,
  Timestamp,

  id_adbe_archiveRevInfo,
  ArchiveRevInfo,
} from '@peculiar/asn1-adobe-acrobat';

import { AsnData } from './asn_data';

export type TExtensionValue = AuthorityInfoAccessSyntax
  | AuthorityKeyIdentifier
  | BasicConstraints
  | CertificateIssuer
  | CertificatePolicies
  | CRLDistributionPoints
  | CRLReason
  | ExtendedKeyUsage
  | InhibitAnyPolicy
  | InvalidityDate
  | NameConstraints
  | PolicyConstraints
  | PolicyMappings
  | SubjectDirectoryAttributes
  | SubjectKeyIdentifier
  | QCStatements
  | CertificateTemplate
  | EnrollCertTypeChoice
  | NetscapeComment
  | LeiChoice
  | LeiRoles
  | CertificateTransparency
  | Timestamp
  | ArchiveRevInfo
  | string;

export class Extension<T = TExtensionValue> extends AsnData<AsnExtension> {
  public readonly value: T;

  private getAsnExtnValue() {
    return this.asn.extnValue.buffer;
  }

  constructor(raw: BufferSource) {
    super(raw, AsnExtension);

    const asnExtnValue = this.getAsnExtnValue();

    switch (this.asn.extnID) {
      case id_pe_authorityInfoAccess:
        (this.value as any) = AsnParser.parse(asnExtnValue, AuthorityInfoAccessSyntax);
        break;
      case id_ce_authorityKeyIdentifier:
        (this.value as any) = AsnParser.parse(asnExtnValue, AuthorityKeyIdentifier);
        break;
      case id_ce_basicConstraints:
        (this.value as any) = AsnParser.parse(asnExtnValue, BasicConstraints);
        break;
      case id_ce_certificateIssuer:
        (this.value as any) = AsnParser.parse(asnExtnValue, CertificateIssuer);
        break;
      case id_ce_certificatePolicies:
        (this.value as any) = AsnParser.parse(asnExtnValue, CertificatePolicies);
        break;
      case id_ce_cRLDistributionPoints:
      case '2.5.29.46':
        (this.value as any) = AsnParser.parse(asnExtnValue, CRLDistributionPoints);
        break;
      case id_ce_cRLReasons:
        (this.value as any) = AsnParser.parse(asnExtnValue, CRLReason);
        break;
      case id_ce_extKeyUsage:
        (this.value as any) = AsnParser.parse(asnExtnValue, ExtendedKeyUsage);
        break;
      case id_ce_inhibitAnyPolicy:
        (this.value as any) = AsnParser.parse(asnExtnValue, InhibitAnyPolicy);
        break;
      case id_ce_invalidityDate:
        (this.value as any) = AsnParser.parse(asnExtnValue, InvalidityDate);
        break;
      case id_ce_issuerAltName:
        (this.value as any) = AsnParser.parse(asnExtnValue, IssueAlternativeName);
        break;
      case id_ce_keyUsage:
        (this.value as any) = AsnParser.parse(asnExtnValue, KeyUsage);
        break;
      case id_ce_nameConstraints:
        (this.value as any) = AsnParser.parse(asnExtnValue, NameConstraints);
        break;
      case id_ce_policyConstraints:
        (this.value as any) = AsnParser.parse(asnExtnValue, PolicyConstraints);
        break;
      case id_ce_policyMappings:
        (this.value as any) = AsnParser.parse(asnExtnValue, PolicyMappings);
        break;
      case id_ce_subjectAltName:
        (this.value as any) = AsnParser.parse(asnExtnValue, SubjectAlternativeName);
        break;
      case id_ce_subjectDirectoryAttributes:
        (this.value as any) = AsnParser.parse(asnExtnValue, SubjectDirectoryAttributes);
        break;
      case id_ce_subjectKeyIdentifier:
        (this.value as any) = AsnParser.parse(asnExtnValue, SubjectKeyIdentifier);
        break;
      case id_pe_qcStatements:
        (this.value as any) = AsnParser.parse(asnExtnValue, QCStatements);
        break;
      case id_certificateTemplate:
        (this.value as any) = AsnParser.parse(asnExtnValue, CertificateTemplate);
        break;
      case id_enrollCertType:
        (this.value as any) = AsnParser.parse(asnExtnValue, EnrollCertTypeChoice);
        break;
      case id_netscapeComment:
        (this.value as any) = AsnParser.parse(asnExtnValue, NetscapeComment);
        break;
      case id_netscapeCertType:
        (this.value as any) = AsnParser.parse(asnExtnValue, NetscapeCertType);
        break;
      case id_caVersion:
        (this.value as any) = AsnParser.parse(asnExtnValue, CaVersion);
        break;
      case id_certificateTransparency:
        (this.value as any) = AsnParser.parse(asnExtnValue, CertificateTransparency);
        break;
      case id_lei:
        (this.value as any) = AsnParser.parse(asnExtnValue, LeiChoice);
        break;
      case id_lei_roles:
        (this.value as any) = AsnParser.parse(asnExtnValue, LeiRoles);
        break;
      case id_adbe_timestamp:
        (this.value as any) = AsnParser.parse(asnExtnValue, Timestamp);
        break;
      case id_adbe_archiveRevInfo:
        (this.value as any) = AsnParser.parse(asnExtnValue, ArchiveRevInfo);
        break;
      default:
        (this.value as any) = Convert.ToHex(asnExtnValue);

        console.warn('Didn\'t detect parser for extension:', this.asn.extnID);
    }
  }
}
