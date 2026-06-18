import { id_ce_subjectAltName } from '@peculiar/asn1-x509';
import { makeExtRaw } from '../../../tests/test_utils';
import { SubjectAlternativeNameParser } from './subject_alternative_name';

describe('SubjectAlternativeNameParser', () => {
  const parser = new SubjectAlternativeNameParser();

  it('exposes the correct OID', () => {
    expect(parser.oids).toContain(id_ce_subjectAltName);
    expect(parser.oids).toContain('2.5.29.17');
  });

  it('parses DNS name and URI', () => {
    // SubjectAlternativeName: dNSName=example.com, URI=http://example.com
    expect(parser.parse(makeExtRaw(
      id_ce_subjectAltName,
      '3021820b6578616d706c652e636f6d8612687474703a2f2f6578616d706c652e636f6d',
    ))).toEqual({
      oid: '2.5.29.17',
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

  it('parses email (rfc822Name)', () => {
    // SubjectAlternativeName: rfc822Name=user@example.com
    // Computed: 3012811075736572406578616d706c652e636f6d
    expect(parser.parse(makeExtRaw(
      id_ce_subjectAltName,
      '3012811075736572406578616d706c652e636f6d',
    ))).toEqual({
      oid: '2.5.29.17',
      critical: false,
      children: [
        {
          title: 'RFC 822 Name', value: 'user@example.com',
        },
      ],
    });
  });

  it('parses IP address', () => {
    // SubjectAlternativeName: iPAddress=192.0.2.1
    // Computed: 30068704c0000201
    expect(parser.parse(makeExtRaw(
      id_ce_subjectAltName,
      '30068704c0000201',
    ))).toEqual({
      oid: '2.5.29.17',
      critical: false,
      children: [
        {
          title: 'IP Address', value: '192.0.2.1', _type: 'iPAddress',
        },
      ],
    });
  });
});
