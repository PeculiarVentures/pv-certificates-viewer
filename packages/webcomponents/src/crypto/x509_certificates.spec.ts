import { describe, it, expect } from 'vitest';
import { loadPemTestAssets } from '../tests/load-test-assets';
import { X509Certificates } from './x509_certificates';

describe('X509Certificates', () => {
  it('parses a comma-separated list of certificates', () => {
    const fixtures = loadPemTestAssets('certificate-viewer');
    const raw = `${fixtures[0].value},${fixtures[1].value}`;
    const chain = new X509Certificates(raw);

    expect(chain).toHaveLength(2);
    expect(chain[0].commonName).toBeTruthy();
    expect(chain.commonName).toContain('_');
  });

  it('throws when fewer than two certificates are provided', () => {
    const [fixture] = loadPemTestAssets('certificate-viewer');

    expect(() => new X509Certificates(fixture.value)).toThrow(
      'Unable to parse string. The array of elements is less than 2',
    );
  });
});
