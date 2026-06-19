import { id_ce_certificateIssuer } from '@peculiar/asn1-x509';
import { makeExtRaw } from '../../../tests/test_utils';
import { CertificateIssuerParser } from './certificate_issuer';

describe('CertificateIssuerParser', () => {
  const parser = new CertificateIssuerParser();

  it('exposes the correct OID', () => {
    expect(parser.oids).toEqual([id_ce_certificateIssuer]);
  });

  it('parses issuer general names', () => {
    // CertificateIssuer: dNSName=example.com, URI=http://example.com
    expect(parser.parse(makeExtRaw(
      id_ce_certificateIssuer,
      '3021820b6578616d706c652e636f6d8612687474703a2f2f6578616d706c652e636f6d',
      true,
    ))).toEqual({
      oid: '2.5.29.29',
      critical: true,
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
