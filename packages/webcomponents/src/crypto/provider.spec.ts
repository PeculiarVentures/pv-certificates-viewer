import { describe, it, expect } from 'vitest';
import { CryptoProvider } from './provider';

describe('CryptoProvider', () => {
  describe('isCryptoKeyPair', () => {
    it('returns true for objects with private and public keys', () => {
      expect(
        CryptoProvider.isCryptoKeyPair({
          privateKey: {},
          publicKey: {},
        }),
      ).toBe(true);
    });

    it('returns false for non key-pair values', () => {
      expect(CryptoProvider.isCryptoKeyPair(null)).toBe(false);
      expect(CryptoProvider.isCryptoKeyPair({ publicKey: {} })).toBe(false);
    });
  });

  describe('set/get', () => {
    it('stores and retrieves a named provider', () => {
      const provider = new CryptoProvider();
      const mockCrypto = {} as Crypto;

      provider.set('custom', mockCrypto);

      expect(provider.get('custom')).toBe(mockCrypto);
    });

    it('throws when requesting an unknown provider name', () => {
      const provider = new CryptoProvider();

      expect(() => provider.get('missing')).toThrow("Cannot get Crypto by name 'missing'");
    });
  });
});
