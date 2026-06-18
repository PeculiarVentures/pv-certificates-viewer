import { id_ce_issuerAltName } from '@peculiar/asn1-x509';
import { makeExtRaw } from '../../../tests/test_utils';
import { IssuerAlternativeNameParser } from './issuer_alternative_name';

describe('IssuerAlternativeNameParser', () => {
  const parser = new IssuerAlternativeNameParser();

  it('exposes the correct OID', () => {
    expect(parser.oids).toEqual([id_ce_issuerAltName]);
  });

  it('parses DNS name and URI', () => {
    // IssuerAlternativeName: dNSName=example.com, URI=http://example.com
    expect(parser.parse(makeExtRaw(
      id_ce_issuerAltName,
      '3021820b6578616d706c652e636f6d8612687474703a2f2f6578616d706c652e636f6d',
    ))).toEqual({
      oid: '2.5.29.18',
      critical: false,
      children: [
        {
          title: 'DNS Name', value: 'example.com', _type: 'dNSName',
        },
        {
          title: 'URI', value: 'http://example.com',
        },
      ],
    });
  });
});
