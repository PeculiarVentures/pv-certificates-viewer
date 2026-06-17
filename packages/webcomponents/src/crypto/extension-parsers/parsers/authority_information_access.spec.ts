import { id_pe_authorityInfoAccess } from '@peculiar/asn1-x509';
import { makeExtRaw } from '../../../tests/test_utils';
import { AuthorityInformationAccessParser } from './authority_information_access';

describe('AuthorityInformationAccessParser', () => {
  const parser = new AuthorityInformationAccessParser();

  it('exposes the correct OID', () => {
    expect(parser.oids).toContain(id_pe_authorityInfoAccess);
    expect(parser.oids).toContain('1.3.6.1.5.5.7.1.1');
  });

  it('parses OCSP and CA Issuers access descriptions', () => {
    // AuthorityInfoAccessSyntax with:
    //   accessMethod=OCSP       (1.3.6.1.5.5.7.48.1)  location=http://ocsp.example.com
    //   accessMethod=CA Issuers (1.3.6.1.5.5.7.48.2)  location=http://ca.example.com/ca.crt
    expect(parser.parse(makeExtRaw(
      id_pe_authorityInfoAccess,
      '304f302306082b060105050730018617687474703a2f2f6f6373702e6578616d706c652e636f6d302806082b06010505073002861c687474703a2f2f63612e6578616d706c652e636f6d2f63612e637274',
    ))).toEqual({
      oid: '1.3.6.1.5.5.7.1.1',
      critical: false,
      children: [
        {
          title: 'Descriptions',
          children: [
            {
              title: '',
              children: [
                {
                  title: 'Method', value: '1.3.6.1.5.5.7.48.1',
                },
                {
                  title: 'URI', value: 'http://ocsp.example.com',
                },
              ],
            },
            {
              title: '',
              children: [
                {
                  title: 'Method', value: '1.3.6.1.5.5.7.48.2',
                },
                {
                  title: 'URI', value: 'http://ca.example.com/ca.crt',
                },
              ],
            },
          ],
        },
      ],
    });
  });

  it('uses the OID string as method value for unknown access methods', () => {
    // AccessDescription: accessMethod=1.2.3.4, location=http://unknown.example.com
    expect(parser.parse(makeExtRaw(
      id_pe_authorityInfoAccess,
      '3023302106032a0304861a687474703a2f2f756e6b6e6f776e2e6578616d706c652e636f6d',
    ))).toEqual({
      oid: '1.3.6.1.5.5.7.1.1',
      critical: false,
      children: [
        {
          title: 'Descriptions',
          children: [
            {
              title: '',
              children: [
                {
                  title: 'Method', value: '1.2.3.4',
                },
                {
                  title: 'URI', value: 'http://unknown.example.com',
                },
              ],
            },
          ],
        },
      ],
    });
  });
});
