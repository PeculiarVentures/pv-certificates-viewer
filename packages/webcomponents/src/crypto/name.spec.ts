import { describe, it, expect } from 'vitest';
import { loadPemTestAssets } from '../tests/load-test-assets';
import { Name } from './name';
import { X509Certificate } from './x509_certificate';

describe('Name', () => {
  it('parses subject DN from a certificate fixture', () => {
    const [fixture] = loadPemTestAssets('certificate-viewer');
    const certificate = new X509Certificate(fixture.value);

    expect(Name.parse(certificate.asn.tbsCertificate.subject)).toEqual(certificate.subject);
    expect(certificate.subject.some((part) => part.short === 'CN')).toBe(true);
  });
});
