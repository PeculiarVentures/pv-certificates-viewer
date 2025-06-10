import { Convert } from 'pvtsutils';
import {
  SignedData,
  id_data,
  EncapsulatedContent,
  CertificateSet,
  CertificateChoices,
  ContentInfo,
  id_signedData,
} from '@peculiar/asn1-cms';
import { Certificate } from '@peculiar/asn1-x509';
import { AsnConvert, OctetString } from '@peculiar/asn1-schema';
import { Download } from '../utils';
import { PemConverter } from './pem_converter';
import { X509Certificate } from './x509_certificate';

export class X509Certificates extends Array<X509Certificate> {
  constructor(raw: string) {
    super();

    const rawItems = PemConverter.isPem(raw)
      ? PemConverter.decode(raw).map((value) => Convert.ToBase64Url(value))
      : raw.split(',');

    if (rawItems.length < 2) {
      throw new Error('Unable to parse string. The array of elements is less than 2');
    }

    for (const item of rawItems) {
      this.push(new X509Certificate(item));
    }
  }

  public get commonName(): string {
    return Array.from(this)
      .map((o) => o.commonName)
      .join('_');
  }

  public get raw(): ArrayBuffer {
    const signedData = new SignedData();

    signedData.version = 1;
    signedData.encapContentInfo.eContentType = id_data;
    signedData.encapContentInfo.eContent = new EncapsulatedContent({ single: new OctetString() });
    signedData.certificates = new CertificateSet(
      Array.from(this)
        .map((o) => new CertificateChoices({ certificate: AsnConvert.parse(o.raw, Certificate) })),
    );

    const cms = new ContentInfo({
      contentType: id_signedData,
      content: AsnConvert.serialize(signedData),
    });

    return AsnConvert.serialize(cms);
  }

  public toString(format: 'pem' | 'base64' | 'base64url' = 'pem'): string {
    switch (format) {
      case 'pem':
        return Array.from(this)
          .map((o) => o.toString('pem'))
          .join('\n');
      case 'base64url':
        return Array.from(this)
          .map((o) => o.toString('base64url'))
          .join(',');
      default:
        return Array.from(this)
          .map((o) => o.toString('base64'))
          .join(',');
    }
  }

  public downloadAsPEM(name?: string) {
    Download.cert.asPEM(
      this.toString('pem'),
      name || this.commonName,
    );
  }

  public downloadAsDER(name?: string) {
    Download.cert.asDER(
      this.raw,
      name || this.commonName,
    );
  }
}
