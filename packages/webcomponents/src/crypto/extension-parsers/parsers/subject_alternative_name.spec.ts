import { id_ce_subjectAltName } from '@peculiar/asn1-x509';
import { makeExtRaw } from '../../../tests/test_utils';
import { SubjectAlternativeNameParser } from './subject_alternative_name';

describe('SubjectAlternativeNameParser', () => {
  const parser = new SubjectAlternativeNameParser();

  it('exposes the correct OID', () => {
    expect(parser.oids).toEqual([id_ce_subjectAltName]);
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

  it('parses two otherNames (DisplayText and hex fallback) plus a URI', () => {
    // Real-world SAN containing:
    //   otherName  OID=1.3.6.1.4.1.311.20.2.3 (MS UPN)  value=UTF8String "8352983408@GSA.GOV"
    //   otherName  OID=2.16.840.1.101.3.6.6              value=OCTET STRING (hex fallback)
    //   URI        urn:uuid:ab41bd5b-d223-3b48-9702-9463bd3f6d76
    expect(parser.parse(makeExtRaw(
      id_ce_subjectAltName,
      '307ca022060a2b060104018237140203a0140c1238333532393833343038404753412e474f56'
      + 'a02706086086480165030606a01b0419d13810d8210f2c115501ada1685a010e662cc110813810d7e8'
      + '862d75726e3a757569643a61623431626435622d643232332d336234382d393730322d393436336264336636643736',
    ))).toEqual({
      oid: '2.5.29.17',
      critical: false,
      children: [
        {
          title: 'Other Name',
          children: [
            {
              title: 'Type', value: '1.3.6.1.4.1.311.20.2.3',
            },
            {
              title: 'Value', value: '8352983408@GSA.GOV',
            },
          ],
        },
        {
          title: 'Other Name',
          children: [
            {
              title: 'Type', value: '2.16.840.1.101.3.6.6',
            },
            {
              title: 'Value', value: '0419d13810d8210f2c115501ada1685a010e662cc110813810d7e8',
            },
          ],
        },
        {
          title: 'URI',
          value: 'urn:uuid:ab41bd5b-d223-3b48-9702-9463bd3f6d76',
        },
      ],
    });
  });
});
