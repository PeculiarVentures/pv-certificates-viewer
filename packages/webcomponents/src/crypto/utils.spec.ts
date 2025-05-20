import { Convert } from 'pvtsutils';
import { certificateRawToBuffer } from './utils';

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
  const hexExample = '48656c6c6f20576f726c64'; // 'Hello World' in HEX
  const base64Example = 'SGVsbG8gV29ybGQ='; // 'Hello World' in Base64
  const base64UrlExample = 'SGVsbG8gV29ybGQ'; // 'Hello World' in Base64 URL
  const binaryExample = 'Hello World';

  describe('PEM input', () => {
    it('should decode PEM string to ArrayBuffer', () => {
      const result = certificateRawToBuffer(pemExample);

      expect(result).toBeInstanceOf(ArrayBuffer);
      expect(result.byteLength).toBeGreaterThan(0);
    });
  });

  describe('HEX input', () => {
    it('should decode HEX string to ArrayBuffer', () => {
      const result = certificateRawToBuffer(hexExample);
      const decodedHex = Convert.FromHex(hexExample);

      expect(result).toEqual(decodedHex);
    });
  });

  describe('Base64 input', () => {
    it('should decode Base64 string to ArrayBuffer', () => {
      const result = certificateRawToBuffer(base64Example);
      const decodedBase64 = Convert.FromBase64(base64Example);

      expect(result).toEqual(decodedBase64);
    });
  });

  describe('Base64Url input', () => {
    it('should decode Base64Url string to ArrayBuffer', () => {
      const result = certificateRawToBuffer(base64UrlExample);
      const decodedBase64Url = Convert.FromBase64Url(base64UrlExample);

      expect(result).toEqual(decodedBase64Url);
    });
  });

  describe('Binary input', () => {
    it('should decode Binary string to ArrayBuffer', () => {
      const result = certificateRawToBuffer(binaryExample);
      const decodedBinary = Convert.FromBinary(binaryExample);

      expect(result).toEqual(decodedBinary);
    });
  });
});
