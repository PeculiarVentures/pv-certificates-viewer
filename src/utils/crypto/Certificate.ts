import _Certificate from 'pkijs/src/Certificate';
import { Convert } from 'pvtsutils';
import dayjs from 'dayjs';
import downloadFromBuffer from  '../downloadFromBuffer';
import OIDS from  '../../constants/oids';

import Basic from './Basic';

interface ISubject {
  name: string;
  nameLong: string;
  oid: string;
  value: string;
};

interface IExtension {
  name: string;
  oid: string;
  critical: boolean;
  value: string[] | Record<string, string> | { oid: string; name: string; }[] | string;
}

export default class Certificate extends Basic {
  notBefore: string = '';
  notAfter: string = '';
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
  serialNumber: string = '';
  extensions: IExtension[] = [];
  attributes: any[] = [];
  version: number = 0;

  constructor(value: string, fullDecode: boolean = false) {
    super(value);

    this.decode(fullDecode);
  }

  static base64ToPem(base64: string) {
    base64 = base64.replace(/(.{64})/g, '$1\n');

    return Certificate.pemTagCertificate(base64);
  }

  static getExtensionKeyUsage(extension: any) {
    const usages = [];
    // parse key usage BitString
    const valueHex = new Uint8Array(Convert.FromHex(extension.parsedValue.valueBlock.valueHex));
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

  private decode(fullDecode: boolean = false) {
    this.pem = Certificate.base64ToPem(this.base64);

    const pkijsSchema = new _Certificate({
      schema: this.schema,
    });

    const pkijsSchemaJson = pkijsSchema.toJSON();

    // Start decode
    // decode subject
    if (pkijsSchemaJson.subject) {
      if (Array.isArray(pkijsSchemaJson.subject)) {
        this.subject = Certificate.prepareSubject(pkijsSchemaJson.subject);
      }

      if (Array.isArray(pkijsSchemaJson.subject.typesAndValues)) {
        this.subject = Certificate.prepareSubject(pkijsSchemaJson.subject.typesAndValues);
      }
    }

    // decode issuer
    if (pkijsSchemaJson.issuer) {
      if (Array.isArray(pkijsSchemaJson.issuer)) {
        this.issuer = Certificate.prepareSubject(pkijsSchemaJson.issuer);
      }

      if (Array.isArray(pkijsSchemaJson.issuer.typesAndValues)) {
        this.issuer = Certificate.prepareSubject(pkijsSchemaJson.issuer.typesAndValues);
      }
    }

    // decode notBefore date
    if (pkijsSchemaJson.notBefore && pkijsSchemaJson.notBefore.value) {
      this.notBefore = new Date(pkijsSchemaJson.notBefore.value).toISOString();
    }

    // decode notAfter date
    if (pkijsSchemaJson.notAfter && pkijsSchemaJson.notAfter.value) {
      this.notAfter = new Date(pkijsSchemaJson.notAfter.value).toISOString();
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

        this.publicKey.algorithm.namedCurve = pkijsSchemaJson
          .subjectPublicKeyInfo
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
      algorithm: Certificate.prepareAlgorithm(pkijsSchemaJson.signatureAlgorithm),
      value: pkijsSchemaJson
        .signatureValue
        .valueBlock
        .valueHex
        .toLowerCase(),
      oid: pkijsSchemaJson
        .signatureAlgorithm
        .algorithmId,
    };

    // decode serial number
    this.serialNumber = pkijsSchemaJson.serialNumber
      ? pkijsSchemaJson
          .serialNumber
          .valueBlock
          .valueHex
          .toLowerCase()
      : undefined;

    // decode version
    this.version = pkijsSchemaJson.version;

    if (fullDecode) {
      // decode extensions
      if (pkijsSchemaJson.extensions) {
        pkijsSchemaJson.extensions.forEach((ext) => {
          const extension = {
            name: OIDS[ext.extnID],
            oid: ext.extnID,
            critical: Boolean(ext.critical),
            value: [],
          };

          switch (ext.extnID) {
            // Basic Constraints
            case '2.5.29.19': {
              extension.value = ext.parsedValue;

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

            default:
              extension.value = ext.extnValue.valueBlock.valueHex.toLowerCase();
          }

          this.extensions.push(extension);
        });
      }

      // decode attributes
      if (pkijsSchemaJson.attributes) {
        pkijsSchemaJson.attributes.forEach((attr) => {
          const attribute = {
            name: OIDS[attr.extnID],
            oid: attr.extnID,
            value: [],
          };

          this.attributes.push(attribute);
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
