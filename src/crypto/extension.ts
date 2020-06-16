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
import { AsnParser, OctetString } from '@peculiar/asn1-schema';

import { AsnData } from './asn_data';

export class Extension extends AsnData<AsnExtension>{
  public readonly value: ArrayBuffer
    | any;

  public constructor(raw: BufferSource) {
    super(raw, AsnExtension);

    switch (this.asn.extnID) {
      case id_pe_authorityInfoAccess:
        this.value = AsnParser.parse(this.asn.extnValue, AuthorityInfoAccessSyntax);
        break;
      case id_ce_authorityKeyIdentifier:
        this.value = AsnParser.parse(this.asn.extnValue, AuthorityKeyIdentifier);
        break;
      case id_ce_basicConstraints:
        this.value = AsnParser.parse(this.asn.extnValue, BasicConstraints);
        break;
      case id_ce_certificateIssuer:
        this.value = AsnParser.parse(this.asn.extnValue, CertificateIssuer);
        break;
      case id_ce_certificatePolicies:
        this.value = AsnParser.parse(this.asn.extnValue, CertificatePolicies);
        break;
      case id_ce_cRLDistributionPoints:
      case '2.5.29.46':
        this.value = AsnParser.parse(this.asn.extnValue, CRLDistributionPoints);
        break;
      case id_ce_cRLReasons:
        this.value = AsnParser.parse(this.asn.extnValue, CRLReason);
        break;
      case id_ce_extKeyUsage:
        this.value = AsnParser.parse(this.asn.extnValue, ExtendedKeyUsage);
        break;
      case id_ce_inhibitAnyPolicy:
        this.value = AsnParser.parse(this.asn.extnValue, InhibitAnyPolicy);
        break;
      case id_ce_invalidityDate:
        this.value = AsnParser.parse(this.asn.extnValue, InvalidityDate);
        break;
      case id_ce_issuerAltName:
        this.value = AsnParser.parse(this.asn.extnValue, IssueAlternativeName);
        break;
      case id_ce_keyUsage:
        this.value = AsnParser.parse(this.asn.extnValue, KeyUsage);
        break;
      case id_ce_nameConstraints:
        this.value = AsnParser.parse(this.asn.extnValue, NameConstraints);
        break;
      case id_ce_policyConstraints:
        this.value = AsnParser.parse(this.asn.extnValue, PolicyConstraints);
        break;
      case id_ce_policyMappings:
        this.value = AsnParser.parse(this.asn.extnValue, PolicyMappings);
        break;
      case id_ce_subjectAltName:
        this.value = AsnParser.parse(this.asn.extnValue, SubjectAlternativeName);
        break;
      case id_ce_subjectDirectoryAttributes:
        this.value = AsnParser.parse(this.asn.extnValue, SubjectDirectoryAttributes);
        break;
      case id_ce_subjectKeyIdentifier:
        this.value = AsnParser.parse(this.asn.extnValue, SubjectKeyIdentifier);
        break;
      case id_pe_qcStatements:
        this.value = AsnParser.parse(this.asn.extnValue, QCStatements);
        break;
      case id_certificateTemplate:
        this.value = AsnParser.parse(this.asn.extnValue, CertificateTemplate);
        break;
      case id_enrollCertType:
        this.value = AsnParser.parse(this.asn.extnValue, EnrollCertTypeChoice);
        break;
      case id_netscapeComment:
        this.value = AsnParser.parse(this.asn.extnValue, NetscapeComment);
        break;
      case id_netscapeCertType:
        this.value = AsnParser.parse(this.asn.extnValue, NetscapeCertType);
        break;
      case id_caVersion:
        this.value = AsnParser.parse(this.asn.extnValue, CaVersion);
        break;
      case '1.3.6.1.4.1.11129.2.4.2':
        this.value = AsnParser.parse(this.asn.extnValue, OctetString);
        break;

      default:
        this.value = this.asn.extnValue;

        console.log(this.asn.extnID);
        console.log(Convert.ToHex(this.value));
    }
  }
}
