import { id_ce_subjectDirectoryAttributes } from '@peculiar/asn1-x509';
import { makeExtRaw } from '../../../tests/test_utils';
import { dateShort } from '../../../utils';
import { SubjectDirectoryAttributesParser } from './subject_directory_attributes';

describe('SubjectDirectoryAttributesParser', () => {
  const parser = new SubjectDirectoryAttributesParser();

  it('exposes the correct OID', () => {
    expect(parser.oids).toEqual([id_ce_subjectDirectoryAttributes]);
  });

  it('uses raw OID for unknown attribute types and hex for unparseable values', () => {
    expect(parser.parse(makeExtRaw(
      id_ce_subjectDirectoryAttributes,
      '3010300e06042a03040531060404deadbeef',
    ))).toEqual({
      oid: '2.5.29.9',
      critical: false,
      children: [
        {
          title: '1.2.3.4.5',
          value: '0404deadbeef',
        },
      ],
    });
  });

  it('parses personal data attributes from certificate', () => {
    expect(parser.parse(makeExtRaw(
      id_ce_subjectDirectoryAttributes,
      '305b301006082b06010505070904310413024445300f06082b060105050709033103130146301d06082b060105050709013111180f31393731313031343132303030305a301706082b06010505070902310b0c094461726d7374616474',
    ))).toEqual({
      oid: '2.5.29.9',
      critical: false,
      children: [
        {
          title: '1.3.6.1.5.5.7.9.4',
          value: 'DE',
        },
        {
          title: '1.3.6.1.5.5.7.9.3',
          value: 'F',
        },
        {
          title: '1.3.6.1.5.5.7.9.1',
          value: dateShort(new Date('1971-10-14T12:00:00Z')),
        },
        {
          title: '1.3.6.1.5.5.7.9.2',
          value: 'Darmstadt',
        },
      ],
    });
  });
});
