import { describe, it, expect } from 'vitest';
import { loadPemTestAssets } from '../tests/load-test-assets';
import { snapshotGetters } from '../tests/snapshot-getters';
import { X509AttributeCertificate } from './x509_attribute_certificate';

const certificates = loadPemTestAssets('attribute-certificate-viewer');

describe('X509AttributeCertificate', () => {
  certificates.forEach((certificate) => {
    it(`should parse the test certificate ${certificate.name}`, () => {
      const x509AttributeCertificate = new X509AttributeCertificate(certificate.value);

      x509AttributeCertificate.parseExtensions();
      x509AttributeCertificate.parseAttributes();

      expect(x509AttributeCertificate).toMatchSnapshot('instance');
      expect(snapshotGetters(x509AttributeCertificate)).toMatchSnapshot('getters');
    });
  });
});

describe('X509AttributeCertificate.commonName', () => {
  const [certificate] = certificates;

  it('falls back to the serial number before thumbprints are computed', () => {
    const cert = new X509AttributeCertificate(certificate.value);

    expect(cert.commonName).toBe(`attribute-certificate-${cert.serialNumber}`);
  });

  it('uses the SHA-1 thumbprint once computed', () => {
    const cert = new X509AttributeCertificate(certificate.value);

    cert.thumbprints['SHA-1'] = 'abcd';

    expect(cert.commonName).toBe('attribute-certificate-abcd');
  });
});
