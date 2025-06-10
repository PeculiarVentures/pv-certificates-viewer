import { PemConverter } from './pem_converter';

describe('PemConverter', () => {
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

  describe('isPem', () => {
    it('should return true for valid PEM string', () => {
      expect(PemConverter.isPem(pemExample)).toBeTruthy();
    });

    it('should return false for invalid PEM string', () => {
      const invalidPem = 'Invalid PEM string';

      expect(PemConverter.isPem(invalidPem)).toBeFalsy();
    });
  });

  describe('decode', () => {
    it('should decode PEM string to ArrayBuffer', () => {
      const decoded = PemConverter.decode(pemExample);

      expect(decoded).toHaveLength(1);
      expect(decoded[0].byteLength).toBeGreaterThan(0);
    });
  });

  describe('encode', () => {
    it('should encode ArrayBuffer into PEM format', () => {
      const arrayBuffer = new ArrayBuffer(3);
      const pem = PemConverter.encode(arrayBuffer, 'CERTIFICATE');

      expect(pem).toContain('-----BEGIN CERTIFICATE-----');
      expect(pem).toContain('-----END CERTIFICATE-----');
    });

    it('should encode multiple PEM structures', () => {
      const rawData = new ArrayBuffer(3);
      const pemStructs = [
        {
          type: 'CERTIFICATE', rawData,
        },
        {
          type: 'CERTIFICATE REQUEST', rawData,
        },
      ];
      const pem = PemConverter.encode(pemStructs);

      expect(pem).toContain('-----BEGIN CERTIFICATE-----');
      expect(pem).toContain('-----BEGIN CERTIFICATE REQUEST-----');
    });

    it('should throw an error when tag is missing', () => {
      const rawData = new ArrayBuffer(3);

      expect(() => PemConverter.encode(rawData)).toThrow(Error);
    });
  });
});
