import { Convert } from 'pvtsutils';
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

    // eslint-disable-next-line no-restricted-syntax
    for (const item of rawItems) {
      this.push(new X509Certificate(item));
    }
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
}
