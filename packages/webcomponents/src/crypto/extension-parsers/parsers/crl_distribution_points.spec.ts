import { id_ce_cRLDistributionPoints } from '@peculiar/asn1-x509';
import { makeExtRaw } from '../../../tests/test_utils';
import { CRLDistributionPointsParser } from './crl_distribution_points';

describe('CRLDistributionPointsParser', () => {
  const parser = new CRLDistributionPointsParser();

  it('exposes the correct OIDs', () => {
    expect(parser.oids).toEqual([id_ce_cRLDistributionPoints, '2.5.29.46']);
  });

  it('parses a single distribution point with a URI fullName', () => {
    // Real extension from "COMMISSION DE L'UNION EUROPEENNE" test cert:
    //   URI = "http://crl.harica.gr/HaricaQWACSubCAR1.crl"
    expect(parser.parse(makeExtRaw(
      id_ce_cRLDistributionPoints,
      '30323030a02ea02c862a687474703a2f2f63726c2e6861726963612e67722f48617269636151574143537562434152312e63726c',
    ))).toEqual({
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
    const uriA = '687474703a2f2f612e636f6d';
    const uriB = '687474703a2f2f622e636f6d';
    const gnA = `860c${uriA}`;
    const gnB = `860c${uriB}`;
    const fnA = `a00e${gnA}`;
    const fnB = `a00e${gnB}`;
    const dpnA = `a010${fnA}`;
    const dpnB = `a010${fnB}`;
    const dpA = `3012${dpnA}`;
    const dpB = `3012${dpnB}`;
    const valueHex = `3028${dpA}${dpB}`;

    expect(parser.parse(makeExtRaw(id_ce_cRLDistributionPoints, valueHex))).toEqual({
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
