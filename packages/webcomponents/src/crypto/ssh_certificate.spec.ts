import { describe, it, expect } from 'vitest';
import { loadRawTestAssets } from '../tests/load-test-assets';
import { SshCertificate } from './ssh_certificate';

const certificates = loadRawTestAssets('ssh-certificate-viewer');

async function parse(raw: string) {
  const cert = new SshCertificate(raw);

  await cert.parsePublicKey();
  await cert.parseSignatureKey();

  return cert;
}

describe('SshCertificate', () => {
  it('has fixtures', () => {
    expect(certificates.map((c) => c.name)).toEqual([
      'ssh-host-ecdsa-ed25519-ca.pub',
      'ssh-user-ed25519-rsa-ca.pub',
    ]);
  });

  certificates.forEach((certificate) => {
    it(`should parse the rendered fields of ${certificate.name}`, async () => {
      const cert = await parse(certificate.value);

      expect({
        type: cert.type,
        serialNumber: cert.serialNumber,
        notBefore: cert.notBefore.toISOString(),
        notAfter: cert.notAfter.toISOString(),
        validity: cert.validity,
        keyId: cert.keyId,
        principals: cert.principals,
        criticalOptions: cert.criticalOptions,
        extensions: cert.extensions,
        commonName: cert.commonName,
        publicKey: cert.publicKey,
        signatureKey: cert.signatureKey,
      }).toMatchSnapshot();
    });

    it(`should export ${certificate.name} as the OpenSSH text line`, async () => {
      const cert = await parse(certificate.value);

      expect(await cert.toString('pem')).toBe(certificate.value.trim());
    });

    it(`should round-trip ${certificate.name} through base64url`, async () => {
      const cert = await parse(certificate.value);
      const base64url = await cert.toString('base64url');

      expect(base64url).toMatch(/^[A-Za-z0-9_-]+$/);

      const decoded = await parse(base64url);

      expect(await decoded.toString('pem')).toBe(await cert.toString('pem'));
      expect(decoded.publicKey).toEqual(cert.publicKey);
    });
  });

  it('should reject text that is not an SSH certificate', () => {
    expect(() => new SshCertificate('not a certificate')).toThrow(TypeError);
  });
});
