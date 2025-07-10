/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export class CryptoProvider {
  private providers = new Map<string, Crypto>();

  public static DEFAULT = 'default';

  public static isCryptoKeyPair(data: unknown): data is CryptoKeyPair {
    return data && typeof data === 'object' && 'privateKey' in data && 'publicKey' in data;
  }

  constructor() {
    // @ts-expect-error - window.crypto is not typed
    const crypto = window.crypto || window.msCrypto;

    if (typeof crypto !== 'undefined') {
      this.set(CryptoProvider.DEFAULT, crypto);
    }
  }

  /**
   * Returns default crypto
   */
  public get(): Crypto;

  /**
   * Returns crypto by name
   * @param key Crypto name
   */
  public get(key = CryptoProvider.DEFAULT) {
    const crypto = this.providers.get(key.toLowerCase());

    if (!crypto) {
      throw new Error(`Cannot get Crypto by name '${key}'`);
    }

    return crypto;
  }

  public set(value: Crypto): this;

  public set(key: string, value: Crypto): this;

  public set(key: string | Crypto, value?: Crypto) {
    if (typeof key === 'string') {
      if (!value) {
        throw new TypeError('Argument \'value\' is required');
      }

      this.providers.set(key.toLowerCase(), value);
    } else {
      this.providers.set(CryptoProvider.DEFAULT, key);
    }

    return this;
  }
}

export const cryptoProvider = new CryptoProvider();
