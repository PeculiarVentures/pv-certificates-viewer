import * as asn1js from 'asn1js';
import { Convert } from 'pvtsutils';

export default class Basic {
  input: string;
  base64: string;
  pem: string;
  hex: string;
  schema: asn1js.LocalBaseBlock;

  static algorithmOIDs: Record<string, { name: string; hash: string }> = {
    '1.2.840.113549.1.1.5': {
      name: 'RSASSA-PKCS1-v1_5',
      hash: 'SHA-1',
    },
    '1.2.840.113549.1.1.11': {
      name: 'RSASSA-PKCS1-v1_5',
      hash: 'SHA-256',
    },
    '1.2.840.113549.1.1.12': {
      name: 'RSASSA-PKCS1-v1_5',
      hash: 'SHA-384',
    },
    '1.2.840.113549.1.1.13': {
      name: 'RSASSA-PKCS1-v1_5',
      hash: 'SHA-512',
    },
    '1.2.840.10045.4.3.2': {
      name: 'ECDSA',
      hash: 'SHA-256',
    },
    '1.2.840.10045.4.1': {
      name: 'ECDSA',
      hash: 'SHA-1',
    },
  };

  static subjectOIDs: Record<string, { short?: string; long: string }> = {
    '2.5.4.3': {
      short: 'CN',
      long: 'Common Name',
    },
    '2.5.4.6': {
      short: 'C',
      long: 'Country',
    },
    '2.5.4.5': {
      short: 'serialNumber',
      long: 'Serial Number',
    },
    '0.9.2342.19200300.100.1.25': {
      short: 'DC',
      long: 'Domain Component',
    },
    '1.2.840.113549.1.9.1': {
      short: 'E',
      long: 'Email',
    },
    '2.5.4.42': {
      short: 'G',
      long: 'Given Name',
    },
    '2.5.4.43': {
      short: 'I',
      long: 'Initials',
    },
    '2.5.4.7': {
      short: 'L',
      long: 'Locality',
    },
    '2.5.4.10': {
      short: 'O',
      long: 'Organization',
    },
    '2.5.4.11': {
      short: 'OU',
      long: 'Organization Unit',
    },
    '2.5.4.8': {
      short: 'ST',
      long: 'State',
    },
    '2.5.4.9': {
      short: 'Street',
      long: 'Street Address',
    },
    '2.5.4.4': {
      short: 'SN',
      long: 'Surname',
    },
    '2.5.4.12': {
      short: 'T',
      long: 'Title',
    },
    '1.2.840.113549.1.9.8': {
      long: 'Unstructured Address',
    },
    '1.2.840.113549.1.9.2': {
      long: 'Unstructured Name',
    },
    '1.3.6.1.4.1.311.60.2.1.3': {
      short: 'jurisdictionCountry',
      long: 'Jurisdiction Country',
    },
    '2.5.4.15': {
      short: 'businessCategory',
      long: 'Business Category',
    },
    '1.3.6.1.2.1.1.5': {
      long: 'Host Name',
    },
  };

  static validation = {
    isHex: (value: string) => /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/.test(value),
    isPem: (value: string) => /-----BEGIN.+-----/.test(value),
  };

  static base64Clear(base64: string) {
    const res = atob(base64.replace(/[\s\r\n]/g, ''));

    if (Basic.validation.isPem(res)) {
      return atob(res
        .replace(/-----.+-----/g, '')
        .replace(/[\s\r\n]/g, ''));
    }

    return res;
  }

  static pemTagCertificate(base64: string) {
    return `-----BEGIN CERTIFICATE-----\n${base64}\n-----END CERTIFICATE-----`;
  }

  static pemTagCertificateRequest(base64: string) {
    return `-----BEGIN CERTIFICATE REQUEST-----\n${base64}\n-----END CERTIFICATE REQUEST-----`;
  }

  static pemTagNewCertificateRequest(base64: string) {
    return `-----BEGIN NEW CERTIFICATE REQUEST-----\n${base64}\n-----END NEW CERTIFICATE REQUEST-----`;
  }

  static formatHex(value: string) {
    return value.replace(/(.{32})/g, '$1\n').replace(/(.{4})/g, '$1 ').trim();
  }

  constructor(value: string) {
    this.input = value;

    this.init();
  }

  private init() {
    let certificateBuffer: ArrayBuffer

    if (Basic.validation.isHex(this.input)) {
      certificateBuffer = Convert.FromHex(this.input);
    } else {
      certificateBuffer = Convert.FromBase64(this.input);
    }

    // crypto.subtle.digest('SHA-1', certificateBuffer)
    //   .then((res) => {
    //     console.log(Convert.ToHex(res));
    //   });

    this.schema = asn1js.fromBER(certificateBuffer).result;
    this.base64 = Convert.ToBase64(certificateBuffer);
    this.hex = Basic.formatHex(Convert.ToHex(certificateBuffer));
  }

  static prepareSubject(subjects: object[]) {
    if (!subjects) {
      return [];
    }

    return subjects.map((subject: any) => {
      const oid = Basic.subjectOIDs[subject.type.toString()];

      return {
        name: oid && oid.short ? oid.short : '',
        nameLong: oid ? oid.long : '',
        oid: subject.type,
        value: subject.value.valueBlock.value,
      };
    });
  }

  static prepareAlgorithm(algorithm: { algorithmId: string }) {
    if (!algorithm) {
      return { name: '' };
    }

    if (Basic.algorithmOIDs[algorithm.algorithmId]) {
      return Basic.algorithmOIDs[algorithm.algorithmId];
    }

    return {
      name: algorithm.algorithmId,
    };
  }
}
