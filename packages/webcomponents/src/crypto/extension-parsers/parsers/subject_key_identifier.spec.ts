import { id_ce_subjectKeyIdentifier } from '@peculiar/asn1-x509';
import { makeExtRaw } from '../../../tests/test_utils';
import { SubjectKeyIdentifierParser } from './subject_key_identifier';

describe('SubjectKeyIdentifierParser', () => {
  const parser = new SubjectKeyIdentifierParser();

  it('exposes the correct OID', () => {
    expect(parser.oids).toEqual([id_ce_subjectKeyIdentifier]);
  });

  it('parses the key identifier as a hex string', () => {
    // Real extension from Adobe Systems Incorporated.cer (test_assets)
    expect(parser.parse(makeExtRaw(
      id_ce_subjectKeyIdentifier,
      '041482b7384a93aa9b10ef80bbd954e2f10ffb809cde',
    ))).toEqual({
      oid: '2.5.29.14',
      critical: false,
      children: [
        {
          title: 'Key Identifier', value: '82b7384a93aa9b10ef80bbd954e2f10ffb809cde', _type: 'subjectKeyId',
        },
      ],
    });
  });
});
