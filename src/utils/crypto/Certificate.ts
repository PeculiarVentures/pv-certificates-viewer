import _Certificate from 'pkijs/src/Certificate';
import { Convert } from 'pvtsutils';
import dayjs from 'dayjs';
import downloadFromBuffer from  '../downloadFromBuffer';

import Basic from './Basic';

interface ISubject {
  name: string;
  nameLong: string;
  oid: string;
  value: string;
};

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
  version: number = 0;

  constructor(value: string) {
    super(value);

    this.decode();
  }

  static base64ToPem(base64: string) {
    base64 = base64.replace(/(.{64})/g, '$1\n');

    return Certificate.pemTagCertificate(base64);
  }

  private decode() {
    this.pem = Certificate.base64ToPem(this.base64);

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

    // decode issuer
    this.issuer = Certificate.prepareSubject(
      pkijsSchemaJson.issuer
        ? pkijsSchemaJson.issuer.typesAndValues
        : pkijsSchemaJson.issuer,
    );

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

  downloadAsPEM() {
    downloadFromBuffer(this.pem, 'text/plain', this.commonName, 'crt');
  }

  downloadAsDER() {
    downloadFromBuffer(this.hex, 'application/octet-stream', this.commonName, 'crt');
  }
}
