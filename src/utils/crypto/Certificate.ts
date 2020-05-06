import { Convert } from 'pvtsutils';
import * as asn1js from 'asn1js';

import * as dateFormatter from '../dateFormatter';
import downloadFromBuffer from  '../downloadFromBuffer';
import OIDS from  '../../constants/oids';
import SANs from '../../constants/san_types';

import * as pkijs from './pkijs';
import Basic from './Basic';

interface ISubject extends Record<string, { nameLong: string; oid: string; value: string; }> {}

export enum EnumOIDs {
  BasicConstraints = '2.5.29.19',
  KeyUsage = '2.5.29.15',
  ExtendedKeyUsage = '2.5.29.37',
  CertificatePolicies = '2.5.29.32',
  AuthorityKeyIdentifier = '2.5.29.35',
  SubjectKeyIdentifier = '2.5.29.14',
  CertificateAuthorityInformationAccess = '1.3.6.1.5.5.7.1.1',
  CRLDistributionPoints = '2.5.29.31',
  SubjectAlternativeName = '2.5.29.17',
  NetscapeCertificateType = '2.16.840.1.113730.1.1',
  NameConstraints = '2.5.29.30',
  CertificateTransparency = '1.3.6.1.4.1.11129.2.4.2',
  CertificateTemplate = '1.3.6.1.4.1.311.21.7',
  QualifiedCertificateStatements = '1.3.6.1.5.5.7.1.3',
  MicrosoftCARenewal = '1.3.6.1.4.1.311.21.1',
  MicrosoftCertificateType = '1.3.6.1.4.1.311.20.2',
  SubjectDirectoryAttributes = '2.5.29.9',
  AdobeTimestamp = '1.2.840.113583.1.1.9.1',
  ANY = '',
}

export interface IExtensionBasic<O, V> {
  name: string;
  oid: O;
  critical: boolean;
  value: V;
}

interface IExtensionBasicConstraints
  extends IExtensionBasic<
    EnumOIDs.BasicConstraints,
    { cA: boolean; pathLenConstraint?: number; }
  > {}

interface IExtensionKeyUsage
  extends IExtensionBasic<
    EnumOIDs.KeyUsage,
    string[]
  > {}

interface IExtensionNetscapeCertificateType
  extends IExtensionBasic<
    EnumOIDs.NetscapeCertificateType,
    string[]
  > {}

interface IExtensionExtendedKeyUsage
  extends IExtensionBasic<
    EnumOIDs.ExtendedKeyUsage,
    { oid: string; name: string }[]
  > {}

interface IExtensionCertificatePolicies
  extends IExtensionBasic<
    EnumOIDs.CertificatePolicies,
    {
      policies: { oid: string; name?: string }[];
      qualifiers: { oid: string; name?: string; value: string }[];
    }
  > {}

interface IExtensionCRLDistributionPoints
  extends IExtensionBasic<
    EnumOIDs.CRLDistributionPoints,
    pkijs.DistributionPoint[]
  > {}

interface IExtensionCertificateAuthorityInformationAccess
  extends IExtensionBasic<
    EnumOIDs.CertificateAuthorityInformationAccess,
    { name?: string; oid: string, type: number; value: string; }[]
  > {}

interface IExtensionSubjectAlternativeName
  extends IExtensionBasic<
    EnumOIDs.SubjectAlternativeName,
    any[]
  > {}

interface IExtensionNameConstraints
  extends IExtensionBasic<
    EnumOIDs.NameConstraints,
    { permitted: any[]; excluded: any[] }
  > {}

interface IExtensionCertificateTemplate
  extends IExtensionBasic<
    EnumOIDs.CertificateTemplate,
    { templateID: string; templateMajorVersion: number; templateMinorVersion: number; }
  > {}

export interface IExtensionAuthorityKeyIdentifier
  extends IExtensionBasic<
    EnumOIDs.AuthorityKeyIdentifier,
    { keyIdentifier: string; authorityCertIssuer?: string; authorityCertSerialNumber?: string; }
  > {}

interface IExtensionCertificateTransparency
  extends IExtensionBasic<
    EnumOIDs.CertificateTransparency,
    {
      logID: string;
      name?: string;
      timestamp: Date;
      version: number;
      hashAlgorithm: string;
      signatureAlgorithm: string;
    }[]
  > {}

export interface IExtensionSubjectKeyIdentifier
  extends IExtensionBasic<
    EnumOIDs.SubjectKeyIdentifier,
    string
  > {}

interface IExtensionQualifiedCertificateStatements
  extends IExtensionBasic<
    EnumOIDs.QualifiedCertificateStatements,
    { oid: string, name: string; }[]
  > {}

interface IExtensionMicrosoftCARenewal
  extends IExtensionBasic<
    EnumOIDs.MicrosoftCARenewal,
    { certificateIndex: number; keyIndex: number; }
  > {}

interface IExtensionMicrosoftCertificateType
  extends IExtensionBasic<
    EnumOIDs.MicrosoftCertificateType,
    string
  > {}

interface IExtensionSubjectDirectoryAttributes
  extends IExtensionBasic<
    EnumOIDs.SubjectDirectoryAttributes,
    { oid: string, name: string; value: string[]; }[]
  > {}

interface IExtensionAdobeTimestamp
  extends IExtensionBasic<
    EnumOIDs.AdobeTimestamp,
    { version: number, location: string; requiresAuth?: boolean; }
  > {}

export type TExtension = IExtensionBasic<EnumOIDs.ANY, string>
  | IExtensionBasicConstraints
  | IExtensionKeyUsage
  | IExtensionExtendedKeyUsage
  | IExtensionCertificatePolicies
  | IExtensionAuthorityKeyIdentifier
  | IExtensionCRLDistributionPoints
  | IExtensionCertificateAuthorityInformationAccess
  | IExtensionSubjectAlternativeName
  | IExtensionCertificateTemplate
  | IExtensionNameConstraints
  | IExtensionNetscapeCertificateType
  | IExtensionCertificateTransparency
  | IExtensionSubjectKeyIdentifier
  | IExtensionQualifiedCertificateStatements
  | IExtensionMicrosoftCARenewal
  | IExtensionMicrosoftCertificateType
  | IExtensionSubjectDirectoryAttributes
  | IExtensionAdobeTimestamp;

export default class Certificate extends Basic {
  notBefore?: Date;
  notAfter?: Date;
  validity: string = '';
  subject?: ISubject;
  issuer?: ISubject;
  publicKey: {
    algorithm: {
      name: string;
      modulusBits?: number;
      publicExponent?: number;
      namedCurve?: number;
    };
    value: string;
    oid: string;
  };
  signature: {
    algorithm: {
      name: string;
      hash?: string;
    };
    value: string;
    oid: string;
  };
  serialNumber?: string;
  extensions: TExtension[] = [];
  version: number = 0;
  isRoot: boolean = false;

  constructor(value: string, name?: string, fullDecode: boolean = false) {
    super(value, name);

    this.decode(fullDecode);
  }

  static base64ToPem(base64: string) {
    return Certificate.pemTagCertificate(base64.replace(/(.{64})/g, '$1\n'));
  }

  static getExtensionNetscapeCertType(extension: pkijs.Extension): string[] {
    const usages = [];
    // parse key usage BitString
    const bitString = asn1js.fromBER(extension.extnValue.valueBlock.valueHex).result;
    const unusedBits = (bitString as any).valueBlock.unusedBits;
    let byte = new Uint8Array((bitString as any).valueBlock.valueHex)[0];

    byte >>= unusedBits;
    byte <<= unusedBits;
    /**
     * bit-0 SSL client - this cert is certified for SSL client authentication use
     * bit-1 SSL server - this cert is certified for SSL server authentication use
     * bit-2 S/MIME - this cert is certified for use by clients (New in PR3)
     * bit-3 Object Signing - this cert is certified for signing objects such as Java
     * applets and plugins(New in PR3)
     * bit-4 Reserved - this bit is reserved for future use
     * bit-5 SSL CA - this cert is certified for issuing certs for SSL use
     * bit-6 S/MIME CA - this cert is certified for issuing certs for S/MIME use (New in PR3)
     * bit-7 Object Signing CA - this cert is certified for issuing
     * certs for Object Signing (New in PR3)
     */
    if (byte & 0x80) {
      usages.push('SSL client');
    }
    if (byte & 0x40) {
      usages.push('SSL server');
    }
    if (byte & 0x20) {
      usages.push('S/MIME');
    }
    if (byte & 0x10) {
      usages.push('Object Signing');
    }
    if (byte & 0x08) {
      usages.push('Reserved');
    }
    if (byte & 0x04) {
      usages.push('SSL CA');
    }
    if (byte & 0x02) {
      usages.push('S/MIME CA');
    }
    if (byte & 0x01) {
      usages.push('Object Signing CA');
    }

    return usages;
  }

  static getExtensionKeyUsage(extension: pkijs.Extension): string[] {
    const usages = [];
    // parse key usage BitString
    const valueHex = new Uint8Array(extension.parsedValue.valueBlock.valueHex);
    const unusedBits = extension.parsedValue.valueBlock.unusedBits;
    let keyUsageByte1 = valueHex[0];
    let keyUsageByte2 = valueHex.byteLength > 1 ? valueHex[1] : 0;

    if (valueHex.byteLength === 1) {
      keyUsageByte1 >>= unusedBits;
      keyUsageByte1 <<= unusedBits;
    }
    if (valueHex.byteLength === 2) {
      keyUsageByte2 >>= unusedBits;
      keyUsageByte2 <<= unusedBits;
    }
    if (keyUsageByte1 & 0x80) {
      usages.push('Digital Signature');
    }
    if (keyUsageByte1 & 0x40) {
      usages.push('Non Repudiation');
    }
    if (keyUsageByte1 & 0x20) {
      usages.push('Key Encipherment');
    }
    if (keyUsageByte1 & 0x10) {
      usages.push('Data Encipherment');
    }
    if (keyUsageByte1 & 0x08) {
      usages.push('Key Agreement');
    }
    if (keyUsageByte1 & 0x04) {
      usages.push('Key Cert Sign');
    }
    if (keyUsageByte1 & 0x02) {
      usages.push('cRL Sign');
    }
    if (keyUsageByte1 & 0x01) {
      usages.push('Encipher Only');
    }
    if (keyUsageByte2 & 0x80) {
      usages.push('Decipher Only');
    }

    return usages;
  }

  static decodeIP(value: string) {
    if (value.length === 64 && parseInt(value, 16) === 0) {
      return '::/0';
    }

    if (value.length !== 16) {
      return value;
    }

    const mask = parseInt(value.slice(8), 16)
      .toString(2)
      .split('')
      .reduce((a, k) => a + (+k), 0);
    let ip = value.slice(0, 8)
      .replace(/(.{2})/g, match => `${parseInt(match, 16)}.`);

    ip = ip.slice(0, -1);

    return `${ip}/${mask}`;
  }

  static decodeSANs(altNames: (pkijs.GeneralSubtree | pkijs.GeneralName)[]) {
    return altNames.map((altName) => {
      const altNameBase = 'base' in altName ? altName.base : altName;
      const item = {
        value: undefined,
        name: SANs[altNameBase.type] || `need handler for this type - ${altNameBase.type}`,
        type: altNameBase.type,
      };

      switch (item.type) {
        case 4: {
          item.value = altNameBase.value.typesAndValues.map(i => ({
            name: OIDS[i.type],
            oid: i.type,
            value: i.value.valueBlock.value,
          }));

          break;
        }

        case 7: {
          item.value = Certificate.decodeIP(
            Convert.ToHex(
              altNameBase.value.valueBlock.valueHex,
            ),
          );

          break;
        }

        default: {
          item.value = typeof altNameBase.value === 'string'
            ? altNameBase.value
            : item.type;
        }
      }

      return item;
    });
  }

  private decode(fullDecode: boolean = false) {
    this.pem = Certificate.base64ToPem(this.base64);

    const pkijsSchema = new pkijs.Certificate({
      schema: this.schema,
    });

    // Start decode
    // decode subject
    if (pkijsSchema.subject) {
      if (Array.isArray(pkijsSchema.subject)) {
        this.subject = Certificate.prepareSubject(pkijsSchema.subject);
      }

      if (Array.isArray(pkijsSchema.subject.typesAndValues)) {
        this.subject = Certificate.prepareSubject(pkijsSchema.subject.typesAndValues);
      }
    }

    // decode issuer
    if (pkijsSchema.issuer) {
      if (Array.isArray(pkijsSchema.issuer)) {
        this.issuer = Certificate.prepareSubject(pkijsSchema.issuer);
      }

      if (Array.isArray(pkijsSchema.issuer.typesAndValues)) {
        this.issuer = Certificate.prepareSubject(pkijsSchema.issuer.typesAndValues);
      }
    }

    // decode isRoot
    this.isRoot = JSON.stringify(this.issuer) === JSON.stringify(this.subject);

    // decode notBefore date
    if (pkijsSchema.notBefore && pkijsSchema.notBefore.value) {
      this.notBefore = pkijsSchema.notBefore.value;
    }

    // decode notAfter date
    if (pkijsSchema.notAfter && pkijsSchema.notAfter.value) {
      this.notAfter = pkijsSchema.notAfter.value;
    }

    // decode validity days
    if (this.notAfter) {
      this.validity = dateFormatter.diff(this.notBefore, this.notAfter);
    }

    // decode public key
    this.publicKey = {
      algorithm: {
        name: '',
      },
      value: Convert
        .ToHex(
          pkijsSchema
            .subjectPublicKeyInfo
            .subjectPublicKey
            .valueBeforeDecode,
        )
        .toLowerCase(),
      oid: pkijsSchema
        .subjectPublicKeyInfo
        .algorithm
        .algorithmId,
    };

    const subjectPublicKeyAlgorithmId = pkijsSchema.subjectPublicKeyInfo.algorithm.algorithmId;

    if (subjectPublicKeyAlgorithmId === '1.2.840.10045.2.1') {
      this.publicKey.algorithm.name = 'EC';

      this.publicKey.algorithm.namedCurve = pkijsSchema
        .subjectPublicKeyInfo
        .toJSON()
        .crv;
    } else if (subjectPublicKeyAlgorithmId === '1.2.840.113549.1.1.1') {
      this.publicKey.algorithm.name = 'RSA';

      if ('modulus' in pkijsSchema.subjectPublicKeyInfo.parsedKey) {
        this.publicKey.algorithm.modulusBits = pkijsSchema
          .subjectPublicKeyInfo
          .parsedKey
          .modulus
          .valueBlock
          .valueHex
          .byteLength << 3;
      }

      if ('publicExponent' in pkijsSchema.subjectPublicKeyInfo.parsedKey) {
        this.publicKey.algorithm.publicExponent = pkijsSchema
          .subjectPublicKeyInfo
          .parsedKey
          .publicExponent
          .valueBlock
          .valueHex
          .byteLength === 3
            ? 65537
            : 3;
      }
    } else if (subjectPublicKeyAlgorithmId === '1.3.101.112') {
      this.publicKey.algorithm.name = 'EdDSA';
    }

    // decode signature
    this.signature = {
      algorithm: Certificate.prepareAlgorithm(pkijsSchema.signatureAlgorithm),
      value: Convert.ToHex(
        pkijsSchema
          .signatureValue
          .valueBlock
          .valueHex,
      ),
      oid: pkijsSchema
        .signatureAlgorithm
        .algorithmId,
    };

    // decode serial number
    this.serialNumber = pkijsSchema.serialNumber
      ? Convert.ToHex(
          pkijsSchema
            .serialNumber
            .valueBlock
            .valueHex,
        )
      : undefined;

    /**
     * Decode version
     *
     * for value 2 - version 3
     * for value 1 - version 2
     *
     * https://tools.ietf.org/html/rfc5280#section-4.1.2.1
     */
    this.version = pkijsSchema.version + 1;

    if (fullDecode) {
      // decode extensions
      if (pkijsSchema.extensions) {
        pkijsSchema.extensions.forEach((ext: pkijs.Extension) => {
          if (ext.parsedValue instanceof pkijs.BasicConstraints) {
            const extension: IExtensionBasicConstraints = {
              name: OIDS[ext.extnID] || '',
              critical: ext.critical,
              oid: EnumOIDs.BasicConstraints,
              value: {
                cA: false,
                pathLenConstraint: typeof ext.parsedValue.pathLenConstraint === 'number'
                  ? ext.parsedValue.pathLenConstraint
                  : undefined,
              },
            };

            return this.extensions.push(extension);
          }

          if (ext.parsedValue instanceof pkijs.ExtKeyUsage) {
            const extension: IExtensionExtendedKeyUsage = {
              name: OIDS[ext.extnID] || '',
              critical: ext.critical,
              oid: EnumOIDs.ExtendedKeyUsage,
              value: ext.parsedValue.keyPurposes.map(oid => ({
                oid,
                name: OIDS[oid],
              })),
            };

            return this.extensions.push(extension);
          }

          if (ext.parsedValue instanceof pkijs.CertificatePolicies) {
            const policies = [];
            const qualifiers = [];

            ext.parsedValue.certificatePolicies.forEach((policy) => {
              policies.push({
                oid: policy.policyIdentifier,
                name: OIDS[policy.policyIdentifier],
              });

              policy.policyQualifiers?.forEach((qualifier) => {
                let value = qualifier.qualifier.valueBlock.value;

                if (Array.isArray(value) && value.length === 1) {
                  value = value[0].valueBlock.value;
                } else if (Array.isArray(value) && value.length > 1) {
                  value = '(currently unsupported)';
                }

                qualifiers.push({
                  value,
                  oid: qualifier.policyQualifierId,
                  name: OIDS[qualifier.policyQualifierId],
                });
              });
            });

            const extension: IExtensionCertificatePolicies = {
              name: OIDS[ext.extnID] || '',
              critical: ext.critical,
              oid: EnumOIDs.CertificatePolicies,
              value: {
                policies,
                qualifiers,
              },
            };

            return this.extensions.push(extension);
          }

          if (ext.parsedValue instanceof pkijs.AuthorityKeyIdentifier) {
            const extension: IExtensionAuthorityKeyIdentifier = {
              name: OIDS[ext.extnID] || '',
              critical: ext.critical,
              oid: EnumOIDs.AuthorityKeyIdentifier,
              value: {
                keyIdentifier: Convert.ToHex(
                  ext
                    .parsedValue
                    .keyIdentifier
                    .valueBlock
                    .valueHex,
                ),
                authorityCertSerialNumber: ext.parsedValue.authorityCertSerialNumber
                  ? Convert.ToHex(
                    ext
                      .parsedValue
                      .authorityCertSerialNumber
                      .valueBlock
                      .valueHex,
                  )
                  : undefined,
                // authorityCertIssuer: ext.parsedValue.authorityCertIssuer,
              },
            };

            return this.extensions.push(extension);
          }

          if (ext.parsedValue instanceof pkijs.CRLDistributionPoints) {
            const extension: IExtensionCRLDistributionPoints = {
              name: OIDS[ext.extnID] || '',
              critical: ext.critical,
              oid: EnumOIDs.CRLDistributionPoints,
              value: ext.parsedValue.distributionPoints,
            };

            return this.extensions.push(extension);
          }

          if (ext.parsedValue instanceof pkijs.InfoAccess) {
            const extension: IExtensionCertificateAuthorityInformationAccess = {
              name: OIDS[ext.extnID] || '',
              critical: ext.critical,
              oid: EnumOIDs.CertificateAuthorityInformationAccess,
              value: ext.parsedValue.accessDescriptions.map(accessDescription => ({
                name: OIDS[accessDescription.accessMethod],
                oid: accessDescription.accessMethod,
                type: accessDescription.accessLocation['type'],
                value: accessDescription.accessLocation['value'],
              })),
            };

            return this.extensions.push(extension);
          }

          if (ext.parsedValue instanceof pkijs.AltName) {
            const extension: IExtensionSubjectAlternativeName = {
              name: OIDS[ext.extnID] || '',
              critical: ext.critical,
              oid: EnumOIDs.SubjectAlternativeName,
              value: Certificate.decodeSANs(ext.parsedValue.altNames),
            };

            return this.extensions.push(extension);
          }

          if (ext.parsedValue instanceof pkijs.NameConstraints) {
            const extension: IExtensionNameConstraints = {
              name: OIDS[ext.extnID] || '',
              critical: ext.critical,
              oid: EnumOIDs.NameConstraints,
              value: {
                permitted: Certificate.decodeSANs(ext.parsedValue.permittedSubtrees || []),
                excluded: Certificate.decodeSANs(ext.parsedValue.excludedSubtrees || []),
              },
            };

            return this.extensions.push(extension);
          }

          if (ext.parsedValue instanceof pkijs.SubjectDirectoryAttributes) {
            const extension: IExtensionSubjectDirectoryAttributes = {
              name: OIDS[ext.extnID] || '',
              critical: ext.critical,
              oid: EnumOIDs.SubjectDirectoryAttributes,
              value: ext.parsedValue.attributes.map(attribute => ({
                name: OIDS[attribute.type],
                oid: attribute.type,
                value: attribute['values'].map((value) => {
                  if (value.toDate) {
                    return value.toDate();
                  }

                  return null;
                }),
              })),
            };

            return this.extensions.push(extension);
          }

          if (ext.parsedValue instanceof asn1js.OctetString) {
            const extension = {
              name: OIDS[ext.extnID] || '',
              critical: ext.critical,
              oid: ext.extnID as EnumOIDs.ANY,
              value: Convert.ToHex(
                ext
                  .parsedValue
                  .valueBlock
                  .valueHex,
              ),
            };

            return this.extensions.push(extension);
          }

          if (ext.extnID === EnumOIDs.KeyUsage) {
            const extension: IExtensionKeyUsage = {
              name: OIDS[ext.extnID] || '',
              critical: ext.critical,
              oid: EnumOIDs.KeyUsage,
              value: Certificate.getExtensionKeyUsage(ext),
            };

            return this.extensions.push(extension);
          }

          if (ext.extnID === EnumOIDs.NetscapeCertificateType) {
            const extension: IExtensionNetscapeCertificateType = {
              name: OIDS[ext.extnID] || '',
              critical: ext.critical,
              oid: EnumOIDs.NetscapeCertificateType,
              value: Certificate.getExtensionNetscapeCertType(ext),
            };

            return this.extensions.push(extension);
          }

          if (ext.extnID === EnumOIDs.CertificateTemplate) {
            const extension: IExtensionCertificateTemplate = {
              name: OIDS[ext.extnID] || '',
              critical: ext.critical,
              oid: EnumOIDs.CertificateTemplate,
              value: ext.parsedValue,
            };

            return this.extensions.push(extension);
          }

          if (ext.extnID === EnumOIDs.CertificateTransparency) {
            const extension: IExtensionCertificateTransparency = {
              name: OIDS[ext.extnID] || '',
              critical: ext.critical,
              oid: EnumOIDs.CertificateTransparency,
              value: ext.parsedValue.timestamps.map((timestamp) => {
                const logID = Convert.ToHex(timestamp.logID);

                return {
                  logID,
                  name: Certificate.logs[logID],
                  timestamp: timestamp.timestamp,
                  version: timestamp.version + 1,
                  hashAlgorithm: timestamp.hashAlgorithm,
                  signatureAlgorithm: timestamp.signatureAlgorithm,
                };
              }),
            };

            return this.extensions.push(extension);
          }

          if (ext.extnID === EnumOIDs.QualifiedCertificateStatements) {
            const extension: IExtensionQualifiedCertificateStatements = {
              name: OIDS[ext.extnID] || '',
              critical: ext.critical,
              oid: EnumOIDs.QualifiedCertificateStatements,
              value: ext.parsedValue.values.map(value => ({
                name: OIDS[value.id] || '',
                oid: value.id,
              })),
            };

            return this.extensions.push(extension);
          }

          if (ext.extnID === EnumOIDs.MicrosoftCARenewal) {
            const extension: IExtensionMicrosoftCARenewal = {
              name: OIDS[ext.extnID] || '',
              critical: ext.critical,
              oid: EnumOIDs.MicrosoftCARenewal,
              value: ext.parsedValue,
            };

            return this.extensions.push(extension);
          }

          if (ext.extnID === EnumOIDs.MicrosoftCertificateType) {
            const extension: IExtensionMicrosoftCertificateType = {
              name: OIDS[ext.extnID] || '',
              critical: ext.critical,
              oid: EnumOIDs.MicrosoftCertificateType,
              value: ext.parsedValue.valueBlock.value,
            };

            return this.extensions.push(extension);
          }

          if (ext.extnID === EnumOIDs.AdobeTimestamp) {
            /**
             * https://www.adobe.com/devnet-docs/etk_deprecated/tools/DigSig/oids.html
             */
            const { offset, result } = asn1js.fromBER(ext.extnValue.valueBlock.valueHex);

            if (offset === -1) {
              return;
            }

            const extension: IExtensionAdobeTimestamp = {
              name: OIDS[ext.extnID] || '',
              critical: ext.critical,
              oid: EnumOIDs.AdobeTimestamp,
              value: {
                version: result['valueBlock'].value[0]?.valueBlock.valueDec,
                location: Convert.ToString(result['valueBlock'].value[1]?.valueBlock.valueHex),
                requiresAuth: result['valueBlock'].value[2]?.valueBlock.value,
              },
            };

            return this.extensions.push(extension);
          }


          const extension = {
            name: OIDS[ext.extnID] || '',
            critical: ext.critical,
            oid: ext.extnID as EnumOIDs.ANY,
            value: null,
          };

          if (ext.parsedValue?.valueBlock?.valueHex) {
            extension.value = Convert.ToHex(ext
              .parsedValue
              .valueBlock
              .valueHex);
          } else if (ext.parsedValue) {
            console.log(`Unsupported extension "${ext.extnID}"`);
          } else if (ext.extnValue?.valueBlock?.valueHex) {
            extension.value = Convert.ToHex(ext
              .extnValue
              .valueBlock
              .valueHex);
          }

          this.extensions.push(extension);
        });
      }
    }
  }

  get commonName() {
    if (this.name) {
      return this.name;
    }

    if (this.subject) {
      if (this.subject.CN) {
        return this.subject.CN.value;
      }

      if (this.subject.E) {
        return this.subject.E.value;
      }
    }

    return;
  }

  downloadAsPEM = () => {
    downloadFromBuffer(
      Convert.FromString(this.pem),
      'application/pkix-cert',
      this.commonName,
      'cer',
    );
  }

  downloadAsDER = () => {
    downloadFromBuffer(
      Convert.FromString(this.hex),
      'application/pkix-cert',
      this.commonName,
      'cer',
    );
  }
}
