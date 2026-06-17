import { AsnParser } from '@peculiar/asn1-schema';
import { Extension, id_ce_subjectKeyIdentifier } from '@peculiar/asn1-x509';
import { Convert } from 'pvtsutils';
import { SubjectKeyIdentifierParser } from './subject_key_identifier';

describe('SubjectKeyIdentifierParser', () => {
  const parser = new SubjectKeyIdentifierParser();

  it('exposes the correct OID', () => {
    expect(parser.oids).toEqual([id_ce_subjectKeyIdentifier]);
  });

  it('parses the key identifier as a hex string', () => {
    // Extension { OID 2.5.29.14, OCTET STRING { OctetString(20 bytes) } }
    const ext = AsnParser.parse(
      Convert.FromHex('301d0603551d0e04160414aabbccddee112233445566778899aabbccddeeff'),
      Extension,
    );

    expect(parser.parse(ext)).toEqual({
      oid: '2.5.29.14',
      critical: false,
      children: [
        {
          title: 'Key Identifier', value: 'aabbccddee112233445566778899aabbccddeeff',
        },
      ],
    });
  });
});
