import { describe, it, expect } from 'vitest';
import { loadPemTestAssets } from '../tests/load-test-assets';
import { X509Certificate } from './x509_certificate';

const certificates = loadPemTestAssets('certificate-viewer');

describe('X509Certificate', () => {
  certificates.forEach((certificate) => {
    it(`should parse the test certificate ${certificate.name}`, () => {
      const x509Certificate = new X509Certificate(certificate.value);

      x509Certificate.parseExtensions();

      expect(x509Certificate).toMatchSnapshot();
    });
  });
});
