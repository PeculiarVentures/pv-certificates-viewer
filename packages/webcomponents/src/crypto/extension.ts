/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

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

  id_ce_privateKeyUsagePeriod,
  PrivateKeyUsagePeriod,

  id_entrust_entrustVersInfo,
  EntrustVersionInfo,
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
| KeyUsage
| NetscapeCertType
| CaVersion
| PrivateKeyUsagePeriod
| EntrustVersionInfo
| string;

export class Extension<T extends TExtensionValue> extends AsnData<AsnExtension> {
  public readonly value: T;

  private getAsnExtnValue() {
    return this.asn.extnValue.buffer;
  }

  constructor(raw: BufferSource) {
    super(raw, AsnExtension);

    const asnExtnValue = this.getAsnExtnValue();

    switch (this.asn.extnID) {
      case id_pe_authorityInfoAccess:
        this.value = AsnParser.parse(asnExtnValue, AuthorityInfoAccessSyntax) as T;
        break;
      case id_ce_authorityKeyIdentifier:
        this.value = AsnParser.parse(asnExtnValue, AuthorityKeyIdentifier) as T;
        break;
      case id_ce_basicConstraints:
        this.value = AsnParser.parse(asnExtnValue, BasicConstraints) as T;
        break;
      case id_ce_certificateIssuer:
        this.value = AsnParser.parse(asnExtnValue, CertificateIssuer) as T;
        break;
      case id_ce_certificatePolicies:
        this.value = AsnParser.parse(asnExtnValue, CertificatePolicies) as T;
        break;
      case id_ce_cRLDistributionPoints:
      case '2.5.29.46':
        this.value = AsnParser.parse(asnExtnValue, CRLDistributionPoints) as T;
        break;
      case id_ce_cRLReasons:
        this.value = AsnParser.parse(asnExtnValue, CRLReason) as T;
        break;
      case id_ce_extKeyUsage:
        this.value = AsnParser.parse(asnExtnValue, ExtendedKeyUsage) as T;
        break;
      case id_ce_inhibitAnyPolicy:
        this.value = AsnParser.parse(asnExtnValue, InhibitAnyPolicy) as T;
        break;
      case id_ce_invalidityDate:
        this.value = AsnParser.parse(asnExtnValue, InvalidityDate) as T;
        break;
      case id_ce_issuerAltName:
        this.value = AsnParser.parse(asnExtnValue, IssueAlternativeName) as T;
        break;
      case id_ce_keyUsage:
        this.value = AsnParser.parse(asnExtnValue, KeyUsage) as T;
        break;
      case id_ce_nameConstraints:
        this.value = AsnParser.parse(asnExtnValue, NameConstraints) as T;
        break;
      case id_ce_policyConstraints:
        this.value = AsnParser.parse(asnExtnValue, PolicyConstraints) as T;
        break;
      case id_ce_policyMappings:
        this.value = AsnParser.parse(asnExtnValue, PolicyMappings) as T;
        break;
      case id_ce_subjectAltName:
        this.value = AsnParser.parse(asnExtnValue, SubjectAlternativeName) as T;
        break;
      case id_ce_subjectDirectoryAttributes:
        this.value = AsnParser.parse(asnExtnValue, SubjectDirectoryAttributes) as T;
        break;
      case id_ce_subjectKeyIdentifier:
        this.value = AsnParser.parse(asnExtnValue, SubjectKeyIdentifier) as T;
        break;
      case id_pe_qcStatements:
        this.value = AsnParser.parse(asnExtnValue, QCStatements) as T;
        break;
      case id_certificateTemplate:
        this.value = AsnParser.parse(asnExtnValue, CertificateTemplate) as T;
        break;
      case id_enrollCertType:
        this.value = AsnParser.parse(asnExtnValue, EnrollCertTypeChoice) as T;
        break;
      case id_netscapeComment:
        this.value = AsnParser.parse(asnExtnValue, NetscapeComment) as T;
        break;
      case id_netscapeCertType:
        this.value = AsnParser.parse(asnExtnValue, NetscapeCertType) as T;
        break;
      case id_caVersion:
        this.value = AsnParser.parse(asnExtnValue, CaVersion) as T;
        break;
      case id_certificateTransparency:
        this.value = AsnParser.parse(asnExtnValue, CertificateTransparency) as T;
        break;
      case id_lei:
        this.value = AsnParser.parse(asnExtnValue, LeiChoice) as T;
        break;
      case id_lei_roles:
        this.value = AsnParser.parse(asnExtnValue, LeiRoles) as T;
        break;
      case id_adbe_timestamp:
        this.value = AsnParser.parse(asnExtnValue, Timestamp) as T;
        break;
      case id_adbe_archiveRevInfo:
        this.value = AsnParser.parse(asnExtnValue, ArchiveRevInfo) as T;
        break;
      case id_ce_privateKeyUsagePeriod:
        this.value = AsnParser.parse(asnExtnValue, PrivateKeyUsagePeriod) as T;
        break;
      case id_entrust_entrustVersInfo:
        this.value = AsnParser.parse(asnExtnValue, EntrustVersionInfo) as T;
        break;
      default:
        this.value = Convert.ToHex(asnExtnValue) as T;

        console.warn('Didn\'t detect parser for extension:', this.asn.extnID);
    }
  }
}
