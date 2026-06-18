import { AsnParser } from '@peculiar/asn1-schema';
import { Extension, id_ce_authorityKeyIdentifier } from '@peculiar/asn1-x509';
import { Convert } from 'pvtsutils';
import { AuthorityKeyIdentifierParser } from './authority_key_identifier';

describe('AuthorityKeyIdentifierParser', () => {
  const parser = new AuthorityKeyIdentifierParser();

  it('exposes the correct OID', () => {
    expect(parser.oids).toEqual([id_ce_authorityKeyIdentifier]);
  });

  it('parses keyIdentifier only', () => {
    // AKI SEQUENCE { [0] IMPLICIT 16-byte key id }
    const ext = AsnParser.parse(
      Convert.FromHex('301b0603551d230414301280100102030405060708090a0b0c0d0e0f10'),
      Extension,
    );

    expect(parser.parse(ext)).toEqual({
      oid: '2.5.29.35',
      critical: false,
      children: [
        {
          title: 'Key Identifier', value: '0102030405060708090a0b0c0d0e0f10', _type: 'authorityKeyId',
        },
      ],
    });
  });

  it('parses keyIdentifier and authorityCertSerialNumber', () => {
    // AKI SEQUENCE { [0] 4-byte key id, [2] 2-byte serial }
    const ext = AsnParser.parse(
      Convert.FromHex('30130603551d23040c300a80040a0b0c0d82020102'),
      Extension,
    );

    expect(parser.parse(ext)).toEqual({
      oid: '2.5.29.35',
      critical: false,
      children: [
        {
          title: 'Key Identifier', value: '0a0b0c0d', _type: 'authorityKeyId',
        },
        {
          title: 'Serial Number', value: '0102',
        },
      ],
    });
  });

  it('returns an empty children array when no fields are present', () => {
    // AKI SEQUENCE {} — empty
    // AKI inner: 30 00 (2 bytes), OCTET STRING: 04 02 30 00 (4 bytes)
    // OID: 06 03 55 1d 23 (5 bytes)
    // Extension: 30 0b 06 03 55 1d 23 04 02 30 00 (total 11+2=13 bytes... let's compute)
    // extension content: 5 + 4 = 9 bytes -> 30 09
    const ext = AsnParser.parse(
      Convert.FromHex('30090603551d2304023000'),
      Extension,
    );

    expect(parser.parse(ext)).toEqual({
      oid: '2.5.29.35',
      critical: false,
      children: [],
    });
  });
});
