import { describe, it, expect } from 'vitest';
import { loadPemTestAssets } from '../tests/load-test-assets';
import { snapshotGetters } from '../tests/snapshot-getters';
import { X509Crl } from './x509_crl';

const certificates = loadPemTestAssets('crl-viewer');

describe('X509Crl', () => {
  certificates.forEach((certificate) => {
    it(`should parse the test CRL ${certificate.name}`, () => {
      const crl = new X509Crl(certificate.value);

      crl.parseExtensions();

      expect(crl).toMatchSnapshot();
      expect(snapshotGetters(crl)).toMatchSnapshot('getters');
    });
  });
});
