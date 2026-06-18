import { AsnParser } from '@peculiar/asn1-schema';
import { Extension, id_ce_cRLDistributionPoints } from '@peculiar/asn1-x509';
import { Convert } from 'pvtsutils';
import { CRLDistributionPointsParser } from './crl_distribution_points';

describe('CRLDistributionPointsParser', () => {
  const parser = new CRLDistributionPointsParser();

  it('exposes the correct OIDs', () => {
    expect(parser.oids).toContain(id_ce_cRLDistributionPoints);
    expect(parser.oids).toContain('2.5.29.46');
  });

  it('parses a single distribution point with a URI fullName', () => {
    // Real extension from "COMMISSION DE L'UNION EUROPEENNE" test cert:
    //   URI = "http://crl.harica.gr/HaricaQWACSubCAR1.crl"
    const ext = AsnParser.parse(
      Convert.FromHex('303b0603551d1f043430323030a02ea02c862a687474703a2f2f63726c2e6861726963612e67722f48617269636151574143537562434152312e63726c'),
      Extension,
    );

    expect(parser.parse(ext)).toEqual({
      oid: '2.5.29.31',
      critical: false,
      children: [
        {
          title: 'Distribution Points',
          children: [
            {
              title: '',
              children: [
                {
                  title: 'URI', value: 'http://crl.harica.gr/HaricaQWACSubCAR1.crl',
                },
              ],
            },
          ],
        },
      ],
    });
  });

  it('parses multiple distribution points', () => {
    // Two DistributionPoints each with one URI fullName.
    // URI 1: "http://a.com" (12 bytes)
    // URI 2: "http://b.com" (12 bytes)
    const uriA = '687474703a2f2f612e636f6d'; // "http://a.com"
    const uriB = '687474703a2f2f622e636f6d'; // "http://b.com"
    const gnA = `860c${uriA}`; // GeneralName [6] IMPLICIT IA5String
    const gnB = `860c${uriB}`;
    const fnA = `a00e${gnA}`; // fullName [0] IMPLICIT (replaces SEQUENCE OF tag)
    const fnB = `a00e${gnB}`;
    const dpnA = `a010${fnA}`; // distributionPoint [0] EXPLICIT
    const dpnB = `a010${fnB}`;
    const dpA = `3012${dpnA}`; // DistributionPoint SEQUENCE
    const dpB = `3012${dpnB}`;
    const crlDPs = `3028${dpA}${dpB}`; // CRLDistributionPoints SEQUENCE OF
    const octetStr = `042a${crlDPs}`; // extnValue OCTET STRING
    const oid = '0603551d1f'; // OID 2.5.29.31
    const extHex = `3031${oid}${octetStr}`;

    const ext = AsnParser.parse(Convert.FromHex(extHex), Extension);

    expect(parser.parse(ext)).toEqual({
      oid: '2.5.29.31',
      critical: false,
      children: [
        {
          title: 'Distribution Points',
          children: [
            {
              title: '', children: [{
                title: 'URI', value: 'http://a.com',
              }],
            },
            {
              title: '', children: [{
                title: 'URI', value: 'http://b.com',
              }],
            },
          ],
        },
      ],
    });
  });
});
