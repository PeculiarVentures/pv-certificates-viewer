import { AsnConvert } from '@peculiar/asn1-schema';
import { Certificate } from '@peculiar/asn1-x509';
import {
  id_sha1WithRSAEncryption,
  id_sha256WithRSAEncryption,
  id_sha384WithRSAEncryption,
  id_sha512WithRSAEncryption,
} from '@peculiar/asn1-rsa';
import {
  id_ecdsaWithSHA1,
  id_ecdsaWithSHA256,
  id_ecdsaWithSHA384,
  id_ecdsaWithSHA512,
} from '@peculiar/asn1-ecc';
import { Convert } from 'pvtsutils';

import { HashedAlgorithm } from './types';
import { cryptoProvider } from './provider';
import { Name } from './name';
import { Extension } from './extension';
import { AsnData } from './asn_data';

export class X509Certificate extends AsnData<Certificate> {
  public readonly serialNumber: string;
  public readonly subject: any[];
  public readonly issuer: any[];
  public readonly notBefore: Date;
  public readonly notAfter: Date;
  public readonly signatureAlgorithm: HashedAlgorithm;
  public readonly extensions: Extension[] = [];

  public constructor(raw: BufferSource) {
    super(raw, Certificate);

    const tbs = this.asn.tbsCertificate;

    this.serialNumber = Convert.ToHex(tbs.serialNumber);
    this.subject = new Name(tbs.subject).toJSON();
    this.issuer = new Name(tbs.issuer).toJSON();
    this.signatureAlgorithm = this.getSignatureAlgorithm();

    const notBefore = tbs.validity.notBefore.utcTime || tbs.validity.notBefore.generalTime;

    if (!notBefore) {
      throw new Error("Cannot get 'notBefore' value");
    }
    this.notBefore = notBefore;

    const notAfter = tbs.validity.notAfter.utcTime || tbs.validity.notAfter.generalTime;

    if (!notAfter) {
      throw new Error("Cannot get 'notAfter' value");
    }
    this.notAfter = notAfter;

    if (tbs.extensions) {
      this.extensions = tbs.extensions.map(o => new Extension(AsnConvert.serialize(o)));
    }
  }

  public async getPublicKey(crypto?: Crypto): Promise<CryptoKey>;
  public async getPublicKey(algorithm: Algorithm, keyUsages: KeyUsage[], crypto?: Crypto): Promise<CryptoKey>;
  public async getPublicKey(...args: any[]) {
    let algorithm: Algorithm = this.getSignatureAlgorithm();
    let keyUsages: KeyUsage[] = ['verify'];
    let crypto = cryptoProvider.get();

    if (args.length > 1) {
      // alg, usages, crypto?
      algorithm = args[0] || algorithm;
      keyUsages = args[1] || keyUsages;
      crypto = args[2] || crypto;
    } else {
      // crypto?
      crypto = args[0] || crypto;
    }

    const spki = AsnConvert.serialize(this.asn.tbsCertificate.subjectPublicKeyInfo);

    return crypto.subtle.importKey('spki', spki, algorithm as any, true, keyUsages);
  }

  public getSignatureAlgorithm(): HashedAlgorithm {
    const signatureAlgorithm = this.asn.signatureAlgorithm;

    switch (signatureAlgorithm.algorithm) {
      case id_sha1WithRSAEncryption:
        return { name: 'RSASSA-PKCS1-v1_5', hash: { name: 'SHA-1' } };
      case id_sha256WithRSAEncryption:
        return { name: 'RSASSA-PKCS1-v1_5', hash: { name: 'SHA-256' } };
      case id_sha384WithRSAEncryption:
        return { name: 'RSASSA-PKCS1-v1_5', hash: { name: 'SHA-384' } };
      case id_sha512WithRSAEncryption:
        return { name: 'RSASSA-PKCS1-v1_5', hash: { name: 'SHA-512' } };
      case id_ecdsaWithSHA1:
        return { name: 'ECDSA', hash: { name: 'SHA-1' } };
      case id_ecdsaWithSHA256:
        return { name: 'ECDSA', hash: { name: 'SHA-256' } };
      case id_ecdsaWithSHA384:
        return { name: 'ECDSA', hash: { name: 'SHA-384' } };
      case id_ecdsaWithSHA512:
        return { name: 'ECDSA', hash: { name: 'SHA-512' } };
      default:
        return { name: signatureAlgorithm.algorithm, hash: { name: '' } };
    }
  }

  public async verify(date = new Date(), crypto = cryptoProvider.get()) {
    const tbs = AsnConvert.serialize(this.asn.tbsCertificate);
    const publicKey = await this.getPublicKey();
    const ok = await crypto.subtle.verify(this.signatureAlgorithm as any, publicKey, this.asn.signatureValue, tbs);
    const time = date.getTime();

    return ok && this.notBefore.getTime() < time && time < this.notAfter.getTime();
  }

  public async getThumbprint(crypto?: Crypto): Promise<ArrayBuffer>;
  public async getThumbprint(algorithm: globalThis.AlgorithmIdentifier, crypto?: Crypto): Promise<ArrayBuffer>;
  public async getThumbprint(...args: any[]) {
    let crypto = cryptoProvider.get();
    let algorithm = 'SHA-1';

    if (args.length === 1 && !args[0]?.subtle) {
      // crypto?
      algorithm = args[0] || algorithm;
      crypto = args[1] || crypto;
    } else {
      crypto = args[0] || crypto;
    }

    return await crypto.subtle.digest(algorithm, this.rawData);
  }
}
