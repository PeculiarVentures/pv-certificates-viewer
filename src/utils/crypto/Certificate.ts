import _Certificate from 'pkijs/src/Certificate';
import { Convert } from 'pvtsutils';

import Basic from './Basic';

export default class Certificate extends Basic {
  notBefore: string = '';
  notAfter: string = '';
  subject: {
    name: string;
    nameLong: string;
    oid: string;
    value: string;
  }[] = [];
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

  constructor(value: string) {
    super(value);

    this.decode();
  }

  static base64ToPem(base64: string) {
    base64 = base64.replace(/(.{64})/g, '$1\n');

    return Certificate.pemTagCertificate(base64);
  }

  private decode() {
    this.base64Pem = Certificate.base64ToPem(this.base64);

    const pkijsSchema = new _Certificate({
      schema: this.schema,
    });

    const pkijsSchemaJson = pkijsSchema.toJSON();

    // Start decode
    // decode subject
    this.subject = Certificate.prepareSubject(
      pkijsSchemaJson.subject
        ? pkijsSchemaJson.subject.typesAndValues
        : pkijsSchemaJson.subject,
    );

    // decode notBefore date
    if (pkijsSchemaJson.notBefore && pkijsSchemaJson.notBefore.value) {
      this.notBefore = new Date(pkijsSchemaJson.notBefore.value).toISOString();
    }

    // decode notAfter date
    if (pkijsSchemaJson.notAfter && pkijsSchemaJson.notAfter.value) {
      this.notAfter = new Date(pkijsSchemaJson.notAfter.value).toISOString();
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
  }
}
