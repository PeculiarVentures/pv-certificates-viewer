import { id_pe_mtcCertificationAuthority_experimental } from '@peculiar/asn1-mtc';
import { makeExtRaw } from '../../../tests/test_utils';
import { MTCCertificationAuthorityParser } from './mtc';

describe('MTCCertificationAuthorityParser', () => {
  const parser = new MTCCertificationAuthorityParser();

  it('registers the experimental MTC CA extension OID', () => {
    expect(parser.oids).toEqual([id_pe_mtcCertificationAuthority_experimental]);
  });

  it('parses log hash, signature algorithm, and serial bounds', () => {
    // From trustasia-ca-log1.pem: SHA-256, ML-DSA-44, min=0, max=2^64-1
    expect(
      parser.parse(
        makeExtRaw(
          id_pe_mtcCertificationAuthority_experimental,
          '3028300b0609608648016503040201300b0609608648016503040311020100020900ffffffffffffffff',
          true,
        ),
      ),
    ).toEqual({
      oid: id_pe_mtcCertificationAuthority_experimental,
      critical: true,
      children: [
        { title: 'Log Hash Algorithm', value: 'SHA-256' },
        { title: 'Signature Algorithm', value: 'ML-DSA-44' },
        { title: 'Min Serial', value: '0' },
        { title: 'Max Serial', value: '18446744073709551615' },
      ],
    });
  });
});
