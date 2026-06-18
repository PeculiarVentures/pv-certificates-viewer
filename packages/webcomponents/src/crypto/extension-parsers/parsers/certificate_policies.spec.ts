import { id_ce_certificatePolicies } from '@peculiar/asn1-x509';
import { makeExtRaw } from '../../../tests/test_utils';
import { CertificatePoliciesParser } from './certificate_policies';

describe('CertificatePoliciesParser', () => {
  const parser = new CertificatePoliciesParser();

  it('exposes the correct OID', () => {
    expect(parser.oids).toEqual([id_ce_certificatePolicies]);
  });

  it('parses a single policy with no qualifiers', () => {
    expect(parser.parse(makeExtRaw(
      id_ce_certificatePolicies,
      '300830060604551d2000',
    ))).toEqual({
      oid: '2.5.29.32',
      critical: false,
      children: [
        {
          title: 'Policies',
          children: [
            {
              title: '',
              children: [{
                title: 'Policy', value: '2.5.29.32.0',
              }],
            },
          ],
        },
      ],
    });
  });

  it('parses a policy with a CPS (id-qt-cps) qualifier', () => {
    expect(parser.parse(makeExtRaw(
      id_ce_certificatePolicies,
      '3024302206032a0304301b301906082b06010505070201160d687474703a2f2f65782e636f6d',
    ))).toEqual({
      oid: '2.5.29.32',
      critical: false,
      children: [
        {
          title: 'Policies',
          children: [
            {
              title: '',
              children: [
                {
                  title: 'Policy', value: '1.2.3.4',
                },
                {
                  title: 'Qualifiers',
                  children: [
                    {
                      title: '',
                      children: [
                        {
                          title: 'Qualifier', value: '1.3.6.1.5.5.7.2.1',
                        },
                        {
                          title: 'Value', value: 'http://ex.com',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
  });

  it('parses multiple policies', () => {
    expect(parser.parse(makeExtRaw(
      id_ce_certificatePolicies,
      '300f30060604551d2000300506032a0304',
    ))).toEqual({
      oid: '2.5.29.32',
      critical: false,
      children: [
        {
          title: 'Policies',
          children: [
            {
              title: '', children: [{
                title: 'Policy', value: '2.5.29.32.0',
              }],
            },
            {
              title: '', children: [{
                title: 'Policy', value: '1.2.3.4',
              }],
            },
          ],
        },
      ],
    });
  });

  it('omits Value node when qualifier value parsing fails', () => {
    expect(parser.parse(makeExtRaw(
      id_ce_certificatePolicies,
      '3018301606032a0304300f300d06082b060105050702010101ff',
    ))).toEqual({
      oid: '2.5.29.32',
      critical: false,
      children: [
        {
          title: 'Policies',
          children: [
            {
              title: '',
              children: [
                {
                  title: 'Policy', value: '1.2.3.4',
                },
                {
                  title: 'Qualifiers',
                  children: [
                    {
                      title: '',
                      children: [
                        {
                          title: 'Qualifier', value: '1.3.6.1.5.5.7.2.1',
                        },
                        null,
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
  });
});
