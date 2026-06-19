import { id_ce_authorityKeyIdentifier } from '@peculiar/asn1-x509';
import { makeExtRaw } from '../../../tests/test_utils';
import { AuthorityKeyIdentifierParser } from './authority_key_identifier';

describe('AuthorityKeyIdentifierParser', () => {
  const parser = new AuthorityKeyIdentifierParser();

  it('exposes the correct OID', () => {
    expect(parser.oids).toEqual([id_ce_authorityKeyIdentifier]);
  });

  it('parses keyIdentifier only', () => {
    expect(parser.parse(makeExtRaw(
      id_ce_authorityKeyIdentifier,
      '301280100102030405060708090a0b0c0d0e0f10',
    ))).toEqual({
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
    expect(parser.parse(makeExtRaw(
      id_ce_authorityKeyIdentifier,
      '300a80040a0b0c0d82020102',
    ))).toEqual({
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
    expect(parser.parse(makeExtRaw(
      id_ce_authorityKeyIdentifier,
      '3000',
    ))).toEqual({
      oid: '2.5.29.35',
      critical: false,
      children: [],
    });
  });
});
