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
import { Name, INameJSON } from './name';
import { Extension } from './extension';
import { AsnData } from './asn_data';

export interface ISignature {
  algorithm: HashedAlgorithm;
  value: BufferSource;
}

export class X509Certificate extends AsnData<Certificate> {
  public readonly serialNumber: string;
  public readonly subject: INameJSON[];
  public readonly issuer: INameJSON[];
  public readonly notBefore: Date;
  public readonly notAfter: Date;
  public extensions: Extension[];
  public readonly version: number;
  public signature: ISignature;
  public publicKey: CryptoKey;

  public constructor(raw: BufferSource) {
    super(raw, Certificate);

    const { tbsCertificate } = this.asn;

    this.serialNumber = Convert.ToHex(tbsCertificate.serialNumber);
    this.subject = new Name(tbsCertificate.subject).toJSON();
    this.issuer = new Name(tbsCertificate.issuer).toJSON();
    this.version = tbsCertificate.version + 1;

    const notBefore = tbsCertificate.validity.notBefore.utcTime
      || tbsCertificate.validity.notBefore.generalTime;

    if (!notBefore) {
      throw new Error("Cannot get 'notBefore' value");
    }

    this.notBefore = notBefore;

    const notAfter = tbsCertificate.validity.notAfter.utcTime
      || tbsCertificate.validity.notAfter.generalTime;

    if (!notAfter) {
      throw new Error("Cannot get 'notAfter' value");
    }

    this.notAfter = notAfter;
  }

  public parseExtensions() {
    const { tbsCertificate } = this.asn;

    if (tbsCertificate.extensions) {
      this.extensions = tbsCertificate.extensions
        .map(e => new Extension(AsnConvert.serialize(e)));
    }
  }

  public async parsePublicKey() {
    const signatureAlgorithm = this.getSignatureAlgorithm();
    const keyUsages: KeyUsage[] = ['verify'];
    const crypto = cryptoProvider.get();
    const spki = AsnConvert.serialize(this.asn.tbsCertificate.subjectPublicKeyInfo);

    this.publicKey = await crypto.subtle
      .importKey('spki', spki, signatureAlgorithm, true, keyUsages);
  }

  public parseSignature() {
    const { signatureValue } = this.asn;

    this.signature = {
      algorithm: this.getSignatureAlgorithm(),
      value: signatureValue,
    };
  }

  private getSignatureAlgorithm(): HashedAlgorithm {
    const { signatureAlgorithm } = this.asn;

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
    const ok = await crypto.subtle
      .verify(this.signature.algorithm, this.publicKey, this.asn.signatureValue, tbs);
    const time = date.getTime();

    return ok && this.notBefore.getTime() < time && time < this.notAfter.getTime();
  }

  public async getThumbprint(
    algorithm: globalThis.AlgorithmIdentifier = 'SHA-1',
  ): Promise<ArrayBuffer> {
    const crypto = cryptoProvider.get();

    return crypto.subtle
      .digest(algorithm, this.rawData);
  }
}
