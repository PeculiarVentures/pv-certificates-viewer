import { describe, it, expect } from 'vitest';
import { certificateRawToBuffer } from './utils';

const bytes = (value: ArrayBuffer) => Array.from(new Uint8Array(value));
const ascii = (text: string) => Array.from(text, (c) => c.charCodeAt(0));

describe('certificateRawToBuffer', () => {
  const pemExample = `-----BEGIN CERTIFICATE-----
MIIBfzCCATGgAwIBAgIUfI5kSdcO2S0+LkpdL3b2VUJG10YwBQYDK2VwMDUxCzAJ
BgNVBAYTAklUMQ8wDQYDVQQHDAZNaWxhbm8xFTATBgNVBAMMDFRlc3QgZWQyNTUx
OTAeFw0yMDA5MDIxMzI1MjZaFw0zMDA5MDIxMzI1MjZaMDUxCzAJBgNVBAYTAklU
MQ8wDQYDVQQHDAZNaWxhbm8xFTATBgNVBAMMDFRlc3QgZWQyNTUxOTAqMAUGAytl
cAMhADupL/3LF2beQKKS95PeMPgKI6gxIV3QB9hjJC7/aCGFo1MwUTAdBgNVHQ4E
FgQUa6W9z536I1l4EmQXrh5y2JqASugwHwYDVR0jBBgwFoAUa6W9z536I1l4EmQX
rh5y2JqASugwDwYDVR0TAQH/BAUwAwEB/zAFBgMrZXADQQBvc3e+KJZaMzbX5TT9
kPP9QH8fAvkAV/IWDxZrBL9lhLaY0tDSv0zWbw624uidBKPgmVD5wm3ec60dNVeF
ZYYG
-----END CERTIFICATE-----`;
  const helloWorld = ascii('Hello World');

  describe('PEM input', () => {
    it('should decode PEM string to ArrayBuffer', () => {
      const result = certificateRawToBuffer(pemExample);

      expect(result).toBeInstanceOf(ArrayBuffer);
      expect(result.byteLength).toBe(387);
      expect(bytes(result).slice(0, 4)).toEqual([0x30, 0x82, 0x01, 0x7f]);
    });

    it('should decode PEM with CRLF line endings', () => {
      const result = certificateRawToBuffer(pemExample.replace(/\n/g, '\r\n'));

      expect(bytes(result)).toEqual(bytes(certificateRawToBuffer(pemExample)));
    });
  });

  describe('HEX input', () => {
    it('should decode lowercase HEX', () => {
      expect(bytes(certificateRawToBuffer('48656c6c6f20576f726c64'))).toEqual(helloWorld);
    });

    it('should decode uppercase HEX', () => {
      expect(bytes(certificateRawToBuffer('48656C6C6F20576F726C64'))).toEqual(helloWorld);
    });

    it('should ignore spaces, tabs and line breaks in HEX', () => {
      expect(bytes(certificateRawToBuffer('48 65 6c\t6c 6f\n20 57\r\n6f 72 6c 64'))).toEqual(
        helloWorld,
      );
    });

    it('should left-pad odd-length HEX', () => {
      expect(bytes(certificateRawToBuffer('abc'))).toEqual([0x0a, 0xbc]);
    });

    it('should prefer HEX over Base64 when both match', () => {
      expect(bytes(certificateRawToBuffer('deadbeef'))).toEqual([0xde, 0xad, 0xbe, 0xef]);
    });

    it('should not treat colon-separated HEX as HEX', () => {
      expect(bytes(certificateRawToBuffer('48:65'))).toEqual(ascii('48:65'));
    });

    it('should not treat a 0x prefix as HEX', () => {
      // `0x4865` is valid Base64Url text
      expect(bytes(certificateRawToBuffer('0x4865'))).toEqual([0xd3, 0x1e, 0x3c, 0xeb]);
    });
  });

  describe('Base64 input', () => {
    it('should decode Base64', () => {
      expect(bytes(certificateRawToBuffer('SGVsbG8gV29ybGQ='))).toEqual(helloWorld);
    });

    it('should decode Base64 with + and /', () => {
      expect(bytes(certificateRawToBuffer('+/+/'))).toEqual([0xfb, 0xff, 0xbf]);
    });

    it('should not treat line-wrapped Base64 as Base64', () => {
      const wrapped = 'SGVs\nbG8g\nV29y\nbGQ=';

      expect(bytes(certificateRawToBuffer(wrapped))).toEqual(ascii(wrapped));
    });
  });

  describe('Base64Url input', () => {
    it('should decode unpadded Base64Url', () => {
      expect(bytes(certificateRawToBuffer('SGVsbG8gV29ybGQ'))).toEqual(helloWorld);
    });

    it('should decode Base64Url with - and _', () => {
      expect(bytes(certificateRawToBuffer('-_-_'))).toEqual([0xfb, 0xff, 0xbf]);
    });
  });

  describe('Binary input', () => {
    it('should decode other text as one byte per character', () => {
      expect(bytes(certificateRawToBuffer('Hello World'))).toEqual(helloWorld);
    });

    it('should keep the low byte of each character', () => {
      expect(bytes(certificateRawToBuffer('İÿ x'))).toEqual([0x30, 0xff, 0x20, 0x78]);
    });
  });

  it('should return an empty ArrayBuffer for empty input', () => {
    const result = certificateRawToBuffer('');

    expect(result).toBeInstanceOf(ArrayBuffer);
    expect(result.byteLength).toBe(0);
  });
});
