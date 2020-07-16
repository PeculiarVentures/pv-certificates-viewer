export class CryptoProvider extends Map<string, Crypto> {
  public static DEFAULT = 'default';

  public static isCryptoKeyPair(data: any): data is CryptoKeyPair {
    return data && data.privateKey && data.publicKey;
  }

  public constructor() {
    super();

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
  public get(key: string): Crypto;
  public get(key = CryptoProvider.DEFAULT) {
    const crypto = super.get(key.toLowerCase());

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
        throw new TypeError("Argument 'value' is required");
      }
      super.set(key.toLowerCase(), value);
    } else {
      super.set(CryptoProvider.DEFAULT, key);
    }

    return this;
  }

}

export const cryptoProvider = new CryptoProvider();
