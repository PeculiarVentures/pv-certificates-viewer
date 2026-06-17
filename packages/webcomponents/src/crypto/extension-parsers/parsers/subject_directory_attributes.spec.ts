import { id_ce_subjectDirectoryAttributes } from '@peculiar/asn1-x509';
import { makeExtRaw } from '../../../tests/test_utils';
import { SubjectDirectoryAttributesParser } from './subject_directory_attributes';

describe('SubjectDirectoryAttributesParser', () => {
  const parser = new SubjectDirectoryAttributesParser();

  it('exposes the correct OID', () => {
    expect(parser.oids).toContain(id_ce_subjectDirectoryAttributes);
    expect(parser.oids).toContain('2.5.29.9');
  });

  it('parses an attribute with a UTF8String value', () => {
    // SubjectDirectoryAttributes: Attribute { type=2.5.4.15 businessCategory, value=UTF8String "Test123" }
    // SDA: 3010300e060355040f31090c0754657374313233
    expect(parser.parse(makeExtRaw(
      id_ce_subjectDirectoryAttributes,
      '3010300e060355040f31090c0754657374313233',
    ))).toEqual({
      oid: '2.5.29.9',
      critical: false,
      children: [
        {
          title: 'Business Category',
          children: [{
            title: 'Value', value: 'Test123',
          }],
        },
      ],
    });
  });

  it('uses raw OID for unknown attribute types', () => {
    // SubjectDirectoryAttributes: type=1.2.3.4.5, value=OCTET STRING "deadbeef"
    // SDA: 3010300e06042a03040531060404deadbeef
    expect(parser.parse(makeExtRaw(
      id_ce_subjectDirectoryAttributes,
      '3010300e06042a03040531060404deadbeef',
    ))).toEqual({
      oid: '2.5.29.9',
      critical: false,
      children: [
        {
          title: '1.2.3.4.5',
          children: [{
            title: 'Value', value: '0404deadbeef',
          }],
        },
      ],
    });
  });
});
