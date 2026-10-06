import {
  id_alg_mtcProof,
  id_alg_mtcProof_experimental,
  id_rdna_trustAnchorID,
  id_rdna_trustAnchorID_experimental,
} from '@peculiar/asn1-mtc';
import { AsnConvert } from '@peculiar/asn1-schema';
import {
  AlgorithmIdentifier,
  AttributeTypeAndValue,
  AttributeValue,
  Name as AsnName,
  RelativeDistinguishedName,
} from '@peculiar/asn1-x509';
import { BufferSourceConverter, Convert } from 'pvtsutils';
import { describe, it, expect } from 'vitest';
import { loadPemTestAssets } from '../tests/load-test-assets';
import { getStringByOID } from '../utils/get_string_by_oid';
import { Name } from './name';
import { X509Certificate } from './x509_certificate';

// Reuse an existing certificate envelope, replacing its proof for structural
// parser tests. These synthetic certificates are NOT cryptographically verified.
const envelope = loadPemTestAssets('certificate-viewer')[0].value;
const header = '00000000000000000000000000010000';
const signatureHex = 'a5'.repeat(2420);
const proofHex = `${header}00097b0481fd594d0974${signatureHex}`;

function certificate(algorithm: string, proof: string): X509Certificate {
  const result = new X509Certificate(envelope);

  result.asn.signatureAlgorithm = new AlgorithmIdentifier({ algorithm });
  result.asn.tbsCertificate.signature = new AlgorithmIdentifier({ algorithm });
  result.asn.signatureValue = Convert.FromHex(proof);

  return new X509Certificate(Convert.ToBase64(AsnConvert.serialize(result.asn)));
}

function name(type: string, value: AttributeValue): AsnName {
  return new AsnName([
    new RelativeDistinguishedName([new AttributeTypeAndValue({ type, value })]),
  ]);
}

describe('MTC assigned identifiers', () => {
  it.each([id_alg_mtcProof, id_alg_mtcProof_experimental])(
    'decodes current proof framing under %s',
    (algorithm) => {
      const result = certificate(algorithm, proofHex).signature;

      expect(result.algorithm).toBe(algorithm);
      expect(result.mtcProofError).toBeUndefined();
      expect(result.mtcProof).toEqual({
        start: 0,
        end: 1,
        subtreeSize: 1,
        isLandmarkRelative: false,
        inclusionProof: [],
        signatures: [{ cosignerId: '32473.77', signature: signatureHex }],
      });
      expect(Convert.ToHex(result.value)).toBe(proofHex);
    },
  );

  it('decodes a landmark-relative proof with a uint24 empty signatures vector', () => {
    const result = certificate(id_alg_mtcProof, `${header}000000`).signature;

    expect(result.mtcProof?.isLandmarkRelative).toBe(true);
    expect(result.mtcProof?.signatures).toEqual([]);
    expect(result.mtcProofError).toBeUndefined();
  });

  it.each([id_alg_mtcProof, id_alg_mtcProof_experimental])(
    'retains malformed proof bytes and a diagnostic under %s',
    (algorithm) => {
      const raw = proofHex.slice(0, -2);
      const result = certificate(algorithm, raw).signature;

      expect(result.mtcProof).toBeUndefined();
      expect(result.mtcProofError).toBeTruthy();
      expect(Convert.ToHex(result.value)).toBe(raw);
    },
  );

  it('does not reinterpret obsolete uint16 signatures framing', () => {
    const raw = `${header}097b0481fd594d0974${signatureHex}`;
    const result = certificate(id_alg_mtcProof_experimental, raw).signature;

    expect(result.mtcProof).toBeUndefined();
    expect(result.mtcProofError).toBeTruthy();
    expect(Convert.ToHex(result.value)).toBe(raw);
  });

  it('preserves the raw fallback for an unknown algorithm', () => {
    const algorithm = '1.3.6.1.5.5.7.6.999';
    const result = certificate(algorithm, proofHex).signature;

    expect(result.algorithm).toBe(algorithm);
    expect(result.mtcProof).toBeUndefined();
    expect(result.mtcProofError).toBeUndefined();
    expect(Convert.ToHex(result.value)).toBe(proofHex);
  });

  it('labels assigned and experimental identifiers without losing the OID', () => {
    expect(getStringByOID(id_alg_mtcProof)).toBe('MTC Proof (1.3.6.1.5.5.7.6.67)');
    expect(getStringByOID(id_rdna_trustAnchorID)).toBe('Trust Anchor ID (1.3.6.1.5.5.7.25.3)');
    expect(getStringByOID(id_alg_mtcProof_experimental, true)).toBe('MTC Proof');
    expect(getStringByOID('1.2.3.999')).toBe('1.2.3.999');
  });

  it.each([id_rdna_trustAnchorID, id_rdna_trustAnchorID_experimental])(
    'decodes a RELATIVE-OID name under %s',
    (type) => {
      const value = new AttributeValue({ anyValue: Convert.FromHex('0d0481fd594d') });
      const der = AsnConvert.serialize(name(type, value));

      expect(Name.parse(der)).toEqual([{ type, short: 'Trust Anchor ID', value: '32473.77' }]);
    },
  );

  it('retains experimental UTF8String names', () => {
    const type = id_rdna_trustAnchorID_experimental;
    const value = new AttributeValue({ utf8String: '32473.77' });

    expect(Name.parse(name(type, value))).toEqual([
      { type, short: 'Trust Anchor ID', value: '32473.77' },
    ]);
  });

  it('preserves undecodable name values for inspection', () => {
    const type = id_rdna_trustAnchorID;
    const value = new AttributeValue({ anyValue: Convert.FromHex('040181') });

    expect(Name.parse(name(type, value))[0]).toEqual({
      type,
      short: 'Trust Anchor ID',
      value: value.toString(),
    });
  });

  it('does not reinterpret unrelated ANY-valued name attributes', () => {
    const type = '1.2.3.999';
    const value = new AttributeValue({ anyValue: Convert.FromHex('0d0481fd594d') });

    expect(Name.parse(name(type, value))[0].value).toBe(value.toString());
  });

  it('renders the assigned issuer name from a certificate envelope', () => {
    const result = certificate(id_alg_mtcProof, proofHex);

    result.asn.tbsCertificate.issuer = name(
      id_rdna_trustAnchorID,
      new AttributeValue({ anyValue: Convert.FromHex('0d0481fd594d') }),
    );

    const decoded = new X509Certificate(Convert.ToBase64(AsnConvert.serialize(result.asn)));

    expect(decoded.issuerToString()).toBe('Trust Anchor ID=32473.77');
    expect(BufferSourceConverter.toUint8Array(decoded.signature.value).length).toBe(2446);
  });
});
