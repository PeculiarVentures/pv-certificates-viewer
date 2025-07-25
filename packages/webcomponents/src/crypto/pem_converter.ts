/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { BufferSourceConverter, Convert } from 'pvtsutils';

const rPaddingTag = '-{5}';
const rEolChars = '\\n';
const rNameTag = `[^${rEolChars}]+`;
const rBeginTag = `${rPaddingTag}BEGIN (${rNameTag}(?=${rPaddingTag}))${rPaddingTag}`;
const rEndTag = `${rPaddingTag}END \\1${rPaddingTag}`;
const rEolGroup = '\\n';
const rHeaderKey = `[^:${rEolChars}]+`;
const rHeaderValue = `(?:[^${rEolChars}]+${rEolGroup}(?: +[^${rEolChars}]+${rEolGroup})*)`;
const rBase64Chars = '[a-zA-Z0-9=+/]+';
const rBase64 = `(?:${rBase64Chars}${rEolGroup})+`;
const rPem = `${rBeginTag}${rEolGroup}(?:((?:${rHeaderKey}: ${rHeaderValue})+))?${rEolGroup}?(${rBase64})${rEndTag}`;

export interface IPemHeader {
  key: string;
  value: string;
}

/**
 * Represents PEM structure
 */
export interface IPemStruct {
  /**
   * Type
   */
  type: string;
  /**
   * Headers
   */
  headers: IPemHeader[];

  /**
   * Decoded message data
   */
  rawData: ArrayBuffer;
}

type TAtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>;

export type TPemStructEncodeParams = TAtLeast<IPemStruct, 'type' | 'rawData'>;

/**
 * Represents PEM Converter.
 */
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class PemConverter {
  public static CertificateTag = 'CERTIFICATE';

  public static CrlTag = 'CRL';

  public static CertificateRequestTag = 'CERTIFICATE REQUEST';

  public static AttributeCertificateTag = 'ATTRIBUTE CERTIFICATE';

  public static isPem(data: string): boolean {
    return typeof data === 'string'
      && new RegExp(rPem, 'g').test(data.replace(/\r/g, ''));
  }

  public static decodeWithHeaders(pem: string): IPemStruct[] {
    pem = pem.replace(/\r/g, ''); // CRLF -> LF
    const pattern = new RegExp(rPem, 'g');

    const res: IPemStruct[] = [];

    let matches: RegExpExecArray | null = null;

    // eslint-disable-next-line no-cond-assign
    while (matches = pattern.exec(pem)) {
      // prepare pem encoded message
      const base64 = matches[3]
        .replace(new RegExp(`[${rEolChars}]+`, 'g'), '');
      const pemStruct: IPemStruct = {
        type: matches[1],
        headers: [],
        rawData: Convert.FromBase64(base64),
      };

      // read headers
      const headersString = matches[2];

      if (headersString) {
        const headers = headersString.split(new RegExp(rEolGroup, 'g'));
        let lastHeader: IPemHeader | null = null;

        for (const header of headers) {
          const [key, value] = header.split(/:(.*)/);

          if (value === undefined) {
            // value
            if (!lastHeader) {
              throw new Error('Cannot parse PEM string. Incorrect header value');
            }

            lastHeader.value += key.trim();
          } else {
            // key and value
            if (lastHeader) {
              pemStruct.headers.push(lastHeader);
            }

            lastHeader = {
              key, value: value.trim(),
            };
          }
        }

        // add last header
        if (lastHeader) {
          pemStruct.headers.push(lastHeader);
        }
      }

      res.push(pemStruct);
    }

    return res;
  }

  /**
   * Decodes PEM to a list of raws
   * @param pem message in PEM format
   */
  public static decode(pem: string): ArrayBuffer[] {
    const blocks = this.decodeWithHeaders(pem);

    return blocks.map((o) => o.rawData);
  }

  /**
   * Encodes a list of raws in PEM format
   * @param raws A list of raws
   * @param tag PEM tag
   */
  public static encode(
    rawData: BufferSource | BufferSource[] | TPemStructEncodeParams[],
    tag?: string,
  ) {
    if (Array.isArray(rawData)) {
      const raws = new Array<string>();

      if (tag) {
        // encode BufferSource[]
        rawData.forEach((element) => {
          if (!BufferSourceConverter.isBufferSource(element)) {
            throw new TypeError('Cannot encode array of BufferSource in PEM format. Not all items of the array are BufferSource');
          }

          raws.push(this.encodeStruct({
            type: tag,
            rawData: BufferSourceConverter.toArrayBuffer(element),
          }));
        });
      } else {
        // encode IPemStruct[]
        rawData.forEach((element) => {
          if (!('type' in element)) {
            throw new TypeError('Cannot encode array of IPemStruct in PEM format. Not all items of the array are PemStrut');
          }

          raws.push(this.encodeStruct(element));
        });
      }

      return raws.join('\n');
    }

    if (!tag) {
      throw new Error('Required argument \'tag\' is missed');
    }

    return this.encodeStruct({
      type: tag,
      rawData: BufferSourceConverter.toArrayBuffer(rawData),
    });
  }

  /**
   * Encodes PEMStruct in PEM block
   * @param pem PEM structure for encoding
   * @returns Returns PEM encoded block
   */
  private static encodeStruct(pem: TPemStructEncodeParams): string {
    const upperCaseType = pem.type.toLocaleUpperCase();

    const res: string[] = [];

    res.push(`-----BEGIN ${upperCaseType}-----`);

    if (pem.headers?.length) {
      for (const header of pem.headers) {
        res.push(`${header.key}: ${header.value}`);
      }

      res.push(''); // blank line
    }

    const base64 = Convert.ToBase64(pem.rawData);
    let sliced: string;
    let offset = 0;
    const rows = Array<string>();

    while (offset < base64.length) {
      if (base64.length - offset < 64) {
        sliced = base64.substring(offset);
      } else {
        sliced = base64.substring(offset, offset + 64);
        offset += 64;
      }

      if (sliced.length !== 0) {
        rows.push(sliced);

        if (sliced.length < 64) {
          break;
        }
      } else {
        break;
      }
    }

    res.push(...rows);
    res.push(`-----END ${upperCaseType}-----`);

    return res.join('\n');
  }
}
