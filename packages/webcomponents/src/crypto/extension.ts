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

  id_ce_issuingDistributionPoint,
  IssuingDistributionPoint,

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

  id_pe_subjectInfoAccess,
  SubjectInfoAccessSyntax,

  id_ce_cRLNumber,
  CRLNumber,

  id_ce_deltaCRLIndicator,
  BaseCRLNumber,
} from '@peculiar/asn1-x509';
import {
  id_pe_qcStatements,
  QCStatements,

  id_pe_biometricInfo,
  BiometricSyntax,
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

  id_role,
  LeiRole,
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
import {
  id_pe_logotype,
  LogotypeExtn,
} from '@peculiar/asn1-x509-logotype';
import {
  id_pe_TNAuthList,
  TNAuthorizationList,
} from '@peculiar/asn1-rfc8226';
import {
  id_ce_keyDescription,
  NonStandardKeyDescription,
} from '@peculiar/asn1-android';
import {
  id_cabforganizationIdentifier,
  CabforganizationIdentifier,
} from './extensions';
import { AsnData } from './asn_data';

const extensionParsers = {
  [id_pe_authorityInfoAccess]: AuthorityInfoAccessSyntax,
  [id_ce_authorityKeyIdentifier]: AuthorityKeyIdentifier,
  [id_ce_basicConstraints]: BasicConstraints,
  [id_ce_certificateIssuer]: CertificateIssuer,
  [id_ce_certificatePolicies]: CertificatePolicies,
  [id_ce_cRLDistributionPoints]: CRLDistributionPoints,
  '2.5.29.46': CRLDistributionPoints,
  [id_ce_issuingDistributionPoint]: IssuingDistributionPoint,
  [id_ce_cRLReasons]: CRLReason,
  [id_ce_extKeyUsage]: ExtendedKeyUsage,
  [id_ce_inhibitAnyPolicy]: InhibitAnyPolicy,
  [id_ce_invalidityDate]: InvalidityDate,
  [id_ce_issuerAltName]: IssueAlternativeName,
  [id_ce_keyUsage]: KeyUsage,
  [id_ce_nameConstraints]: NameConstraints,
  [id_ce_policyConstraints]: PolicyConstraints,
  [id_ce_policyMappings]: PolicyMappings,
  [id_ce_subjectAltName]: SubjectAlternativeName,
  [id_ce_subjectDirectoryAttributes]: SubjectDirectoryAttributes,
  [id_ce_subjectKeyIdentifier]: SubjectKeyIdentifier,
  [id_pe_qcStatements]: QCStatements,
  [id_certificateTemplate]: CertificateTemplate,
  [id_enrollCertType]: EnrollCertTypeChoice,
  [id_netscapeComment]: NetscapeComment,
  [id_netscapeCertType]: NetscapeCertType,
  [id_caVersion]: CaVersion,
  [id_certificateTransparency]: CertificateTransparency,
  [id_lei]: LeiChoice,
  [id_role]: LeiRole,
  [id_adbe_timestamp]: Timestamp,
  [id_adbe_archiveRevInfo]: ArchiveRevInfo,
  [id_ce_privateKeyUsagePeriod]: PrivateKeyUsagePeriod,
  [id_entrust_entrustVersInfo]: EntrustVersionInfo,
  '2.16.724.1.2.2.4.1': BiometricSyntax,
  [id_pe_biometricInfo]: BiometricSyntax,
  [id_pe_logotype]: LogotypeExtn,
  [id_pe_TNAuthList]: TNAuthorizationList,
  [id_pe_subjectInfoAccess]: SubjectInfoAccessSyntax,
  [id_ce_cRLNumber]: CRLNumber,
  [id_ce_deltaCRLIndicator]: BaseCRLNumber,
  [id_ce_keyDescription]: NonStandardKeyDescription,
  [id_cabforganizationIdentifier]: CabforganizationIdentifier,
};

type TExtensionKeys = keyof typeof extensionParsers;

export type TExtensionValue = InstanceType<typeof extensionParsers[TExtensionKeys]> | string;

export class Extension<T extends TExtensionValue> extends AsnData<AsnExtension> {
  public readonly value: T;

  private getAsnExtnValue() {
    return this.asn.extnValue.buffer;
  }

  constructor(raw: BufferSource) {
    super(raw, AsnExtension);

    const asnExtnValue = this.getAsnExtnValue();

    try {
      const target = extensionParsers[this.asn.extnID];

      if (target) {
        this.value = AsnParser.parse<T>(asnExtnValue, target);
      } else {
        console.warn(`Didn't detect parser for "${this.asn.extnID}" extension.`);

        this.value = Convert.ToHex(asnExtnValue) as T;
      }
    } catch (error) {
      console.error(`Error parse "${this.asn.extnID}" extension:`, error.message);

      this.value = Convert.ToHex(asnExtnValue) as T;
    }
  }
}
