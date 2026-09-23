import { describe, it, expect } from 'vitest';
import { loadPemTestAssets } from '../tests/load-test-assets';
import { Pkcs10CertificateRequest } from './pkcs10_certificate_request';

const certificates = loadPemTestAssets('csr-viewer');

describe('Pkcs10CertificateRequest', () => {
  certificates.forEach((certificate) => {
    it(`should parse the test certificate request ${certificate.name}`, () => {
      const request = new Pkcs10CertificateRequest(certificate.value);

      request.parseAttributes();

      expect(request).toMatchSnapshot();
    });
  });
});
