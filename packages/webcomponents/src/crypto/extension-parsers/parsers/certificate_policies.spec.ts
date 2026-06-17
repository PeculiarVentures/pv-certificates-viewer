import { AsnParser } from '@peculiar/asn1-schema';
import { Extension, id_ce_certificatePolicies } from '@peculiar/asn1-x509';
import { Convert } from 'pvtsutils';
import { CertificatePoliciesParser } from './certificate_policies';

describe('CertificatePoliciesParser', () => {
  const parser = new CertificatePoliciesParser();

  it('exposes the correct OID', () => {
    expect(parser.oids).toEqual([id_ce_certificatePolicies]);
  });

  it('parses a single policy with no qualifiers', () => {
    // Extension { OID 2.5.29.32, OCTET STRING { SEQUENCE OF { SEQUENCE { OID 2.5.29.32.0 } } } }
    const ext = AsnParser.parse(
      Convert.FromHex('30110603551d20040a30083006060455 1d2000'.replace(/ /g, '')),
      Extension,
    );

    expect(parser.parse(ext)).toEqual({
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
    // PolicyQualifierInfo: OID id-qt-cps + IA5String "http://ex.com"
    const ext = AsnParser.parse(
      Convert.FromHex('302d0603551d2004263024302206032a0304301b301906082b06010505070201160d687474703a2f2f65782e636f6d'),
      Extension,
    );

    expect(parser.parse(ext)).toEqual({
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
    // Two policies: OID 2.5.29.32.0 and OID 1.2.3.4, both without qualifiers
    const ext = AsnParser.parse(
      Convert.FromHex('30180603551d200411300f300606 04551d2000300506032a0304'.replace(/ /g, '')),
      Extension,
    );

    expect(parser.parse(ext)).toEqual({
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
    // CPS qualifier with invalid bytes (BOOLEAN TRUE, not a valid DisplayText)
    const ext = AsnParser.parse(
      Convert.FromHex('30210603551d20041a30183016 06032a0304300f300d06082b060105050702010101ff'.replace(/ /g, '')),
      Extension,
    );

    expect(parser.parse(ext)).toEqual({
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
