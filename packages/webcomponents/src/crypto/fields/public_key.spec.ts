import { describe, expect, it } from 'vitest';
import { loadPemTestAssets } from '../../tests/load-test-assets';
import { X509Certificate } from '../documents/x509_certificate';
import { bitLength, publicKeyToJSON, toNumber } from './public_key';

const certificates = loadPemTestAssets('certificate-viewer');
const load = (name: string) =>
  new X509Certificate(certificates.find((c) => c.name === name)!.value);

describe('bitLength', () => {
  it('ignores leading zero bytes', () => {
    expect(bitLength(new Uint8Array([0x00, 0x80, 0x00]))).toBe(16);
    expect(bitLength(new Uint8Array([0x01, 0xff]))).toBe(9);
    expect(bitLength(new Uint8Array([0x00]))).toBe(0);
  });
});

describe('toNumber', () => {
  it('reads an unsigned big-endian integer', () => {
    expect(toNumber(new Uint8Array([0x01, 0x00, 0x01]))).toBe(65537);
    expect(toNumber(new Uint8Array([0x03]))).toBe(3);
  });
});

describe('publicKeyToJSON', () => {
  it('decodes RSA modulus size and exponent', () => {
    const json = publicKeyToJSON(load('Configuration.cer').publicKey);

    expect(json.modulusBits).toBe(2048);
    expect(json.exponent).toBe(65537);
    expect(json.namedCurve).toBeUndefined();
  });

  it('decodes the EC named curve', () => {
    const json = publicKeyToJSON(load('Martini Security, LLC.cer').publicKey);

    expect(json.namedCurve).toBe('1.2.840.10045.3.1.7');
    expect(json.modulusBits).toBeUndefined();
  });

  it('hex-encodes the SPKI', () => {
    const cert = load('Test ed25519.cer');

    expect(cert.toJSON().publicKey.value).toMatch(/^302a3005/);
  });
});
