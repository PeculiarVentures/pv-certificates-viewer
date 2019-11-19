import _Certificate from 'pkijs/src/Certificate';
import _Extension from 'pkijs/src/Extension';
import _GeneralSubtree from 'pkijs/src/GeneralSubtree';
import _GeneralName from 'pkijs/src/GeneralName';
import { Convert } from 'pvtsutils';
import * as asn1js from 'asn1js';
import dayjs from 'dayjs';
import downloadFromBuffer from  '../downloadFromBuffer';
import OIDS from  '../../constants/oids';
import LOGS from '../../constants/logs';
import SANs from '../../constants/san_types';

import Basic from './Basic';

interface ISubject {
  name: string;
  nameLong: string;
  oid: string;
  value: string;
};

export interface IExtension {
  name: string;
  oid: string;
  critical: boolean;
  value: string[] | Record<string, string> | { oid: string; name: string; }[] | string;
}

export default class Certificate extends Basic {
  notBefore?: Date;
  notAfter?: Date;
  validity: number = 0;
  subject: ISubject[] = [];
  issuer: ISubject[] = [];
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
  extensions: IExtension[] = [];
  version: number = 0;
  isRoot: boolean = false;

  constructor(value: string, fullDecode: boolean = false) {
    super(value);

    this.decode(fullDecode);
  }

  static base64ToPem(base64: string) {
    base64 = base64.replace(/(.{64})/g, '$1\n');

    return Certificate.pemTagCertificate(base64);
  }

  static getExtensionNetscapeCertType(extension: _Extension) {
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

  static getExtensionKeyUsage(extension: _Extension) {
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

  static decodeSANs(altNames: (_GeneralSubtree | _GeneralName)[]) {
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
            : `type value is not a string - ${item.type}`;
        }
      }

      return item;
    });
  }

  private decode(fullDecode: boolean = false) {
    this.pem = Certificate.base64ToPem(this.base64);

    const pkijsSchema = new _Certificate({
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
    if (this.notBefore && this.notAfter) {
      this.validity = dayjs(this.notAfter).diff(dayjs(this.notBefore), 'day');
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

    if (pkijsSchema.subjectPublicKeyInfo.parsedKey) {
      if (pkijsSchema.subjectPublicKeyInfo.algorithm.algorithmId === '1.2.840.10045.2.1') {
        this.publicKey.algorithm.name = 'EC';

        this.publicKey.algorithm.namedCurve = pkijsSchema
          .subjectPublicKeyInfo
          .toJSON()
          .crv;
      } else {
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
      }
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

    // decode version
    this.version = pkijsSchema.version;

    if (fullDecode) {
      // decode extensions
      if (pkijsSchema.extensions) {
        pkijsSchema.extensions.forEach((ext: _Extension) => {
          const extension = {
            name: OIDS[ext.extnID],
            oid: ext.extnID,
            critical: Boolean(ext.critical),
            value: undefined,
          };

          switch (ext.extnID) {
            // Basic Constraints
            case '2.5.29.19': {
              extension.value = Object.assign(
                { cA: false, },
                ext.parsedValue,
              );

              break;
            }

            // Key Usage
            case '2.5.29.15': {
              extension.value = Certificate.getExtensionKeyUsage(ext);

              break;
            }

            // Extended Key Usage
            case '2.5.29.37': {
              extension.value = ext.parsedValue.keyPurposes.map(oid => ({
                oid,
                name: OIDS[oid],
              }));

              break;
            }

            // Certificate Policies
            case '2.5.29.32': {
              extension.value = ext.parsedValue.certificatePolicies.map(cp => ({
                oid: cp.policyIdentifier,
                name: OIDS[cp.policyIdentifier],
              }));

              break;
            }

            // Authority Key Identifier
            case '2.5.29.35': {
              extension.value = {};

              if (ext.parsedValue.keyIdentifier) {
                extension.value.keyIdentifier = Convert.ToHex(
                  ext
                    .parsedValue
                    .keyIdentifier
                    .valueBlock
                    .valueHex,
                );
              }

              if (ext.parsedValue.authorityCertSerialNumber) {
                extension.value.authorityCertSerialNumber = Convert.ToHex(
                  ext
                    .parsedValue
                    .authorityCertSerialNumber
                    .valueBlock
                    .valueHex,
                );
              }

              if (ext.parsedValue.authorityCertIssuer) {
                extension.value.authorityCertIssuer = ext
                  .parsedValue
                  .authorityCertIssuer;
              }

              break;
            }

            // Certificate Authority Information Access
            case '1.3.6.1.5.5.7.1.1': {
              extension.value = ext.parsedValue.accessDescriptions.map(desc => ({
                oid: desc.accessMethod,
                name: OIDS[desc.accessMethod],
                value: {
                  type: desc.accessLocation.type,
                  value: desc.accessLocation.value,
                },
              }));

              break;
            }

            // CRL Distribution Points
            case '2.5.29.31': {
              extension.value = [];

              ext.parsedValue.distributionPoints.forEach(dp => {
                dp.distributionPoint.forEach(p => {
                  extension.value.push({
                    value: p.value,
                    type: p.type,
                  });
                });
              });

              break;
            }

            // Subject Alternative Name
            case '2.5.29.17': {
              extension.value = Certificate.decodeSANs(ext.parsedValue.altNames);

              break;
            }

            // Netscape Certificate Type
            case '2.16.840.1.113730.1.1': {
              extension.value = Certificate.getExtensionNetscapeCertType(ext);

              break;
            }

            // Name Constraints
            case '2.5.29.30': {
              extension.value = {
                permitted: Certificate.decodeSANs(ext.parsedValue.permittedSubtrees || []),
                excluded: Certificate.decodeSANs(ext.parsedValue.excludedSubtrees || []),
              };

              break;
            }

            // Certificate Transparency
            case '1.3.6.1.4.1.11129.2.4.2': {
              extension.value = ext.parsedValue.timestamps.map((t) => {
                const logName = LOGS.logs.filter(l => l.hex === t.logID.toLowerCase());

                return {
                  logID: t.logID,
                  logName: logName.length > 0 ? logName[0].description : '',
                  timestamp: new Date(t.timestamp).toISOString(),
                  signature: t.signature.valueBeforeDecode,
                  hashAlgorithm: t.hashAlgorithm,
                  signatureAlgorithm: t.signatureAlgorithm,
                };
              });

              break;
            }

            default:
              extension.value = Convert.ToHex(
                ext
                  .extnValue
                  .valueBlock
                  .valueHex,
              );
          }

          this.extensions.push(extension);
        });
      }
    }
  }

  get commonName() {
    for (let i = 0; i <= this.subject.length; i += 1) {
      const subject = this.subject[i];

      if (subject.name === 'CN') {
        return subject.value;
      }
    }

    return;
  }

  downloadAsPEM = () => {
    downloadFromBuffer(this.pem, 'text/plain', this.commonName, 'crt');
  }

  downloadAsDER = () => {
    downloadFromBuffer(this.hex, 'application/octet-stream', this.commonName, 'crt');
  }
}
