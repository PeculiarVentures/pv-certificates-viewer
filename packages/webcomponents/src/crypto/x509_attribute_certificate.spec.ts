import { describe, it, expect } from 'vitest';
import { loadPemTestAssets } from '../tests/load-test-assets';
import { X509AttributeCertificate } from './x509_attribute_certificate';

const certificates = loadPemTestAssets('attribute-certificate-viewer');

describe('X509AttributeCertificate', () => {
  certificates.forEach((certificate) => {
    it(`should parse the test certificate ${certificate.name}`, () => {
      const x509AttributeCertificate = new X509AttributeCertificate(certificate.value);

      x509AttributeCertificate.parseExtensions();
      x509AttributeCertificate.parseAttributes();

      expect(x509AttributeCertificate).toMatchSnapshot();
    });
  });
});
