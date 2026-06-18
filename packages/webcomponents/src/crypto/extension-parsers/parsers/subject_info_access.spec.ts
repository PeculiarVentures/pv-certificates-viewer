import { id_pe_subjectInfoAccess } from '@peculiar/asn1-x509';
import { makeExtRaw } from '../../../tests/test_utils';
import { SubjectInfoAccessParser } from './subject_info_access';

describe('SubjectInfoAccessParser', () => {
  const parser = new SubjectInfoAccessParser();

  it('exposes the correct OID', () => {
    expect(parser.oids).toEqual([id_pe_subjectInfoAccess]);
  });

  it('parses CA repository access description', () => {
    // Real extension from Configuration.cer (test_assets)
    expect(parser.parse(makeExtRaw(
      id_pe_subjectInfoAccess,
      '3047304506082b060105050730058639687474703a2f2f69706b692e757370746f2e676f762f49504b492f43657274732f434163657274734973737565644279555350544f2e703763',
    ))).toEqual({
      oid: '1.3.6.1.5.5.7.1.11',
      critical: false,
      children: [{
        title: 'Descriptions',
        children: [{
          title: '',
          children: [
            {
              title: 'Method', value: '1.3.6.1.5.5.7.48.5',
            },
            {
              title: 'URI', value: 'http://ipki.uspto.gov/IPKI/Certs/CAcertsIssuedByUSPTO.p7c',
            },
          ],
        }],
      }],
    });
  });
});
