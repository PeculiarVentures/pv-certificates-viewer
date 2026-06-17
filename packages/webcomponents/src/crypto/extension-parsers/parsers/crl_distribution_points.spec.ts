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
              title: 'URI', value: 'http://crl.harica.gr/HaricaQWACSubCAR1.crl',
            },
          ],
        },
      ],
    });
  });

  it('parses multiple distribution points', () => {
    // Two DistributionPoints each with one URI fullName.
    // URI 1: "http://a.com" (12 bytes)  context [6] 0x86 0c ...
    // URI 2: "http://b.com" (12 bytes)
    //
    // GeneralName [6] IMPLICIT: 86 0c 687474703a2f2f612e636f6d
    // GeneralNames SEQUENCE: 30 0e 86 0c ...
    // DistributionPointName [0]: a0 10 30 0e 86 0c ...
    // DistributionPoint SEQUENCE: 30 12 a0 10 ...
    //
    // For URI "http://a.com" (12 bytes): 86 0c 687474703a2f2f612e636f6d
    // GeneralNames: 30 0e 86 0c ...  (16 bytes)
    // fullName [0]: a0 10 30 0e ...  (18 bytes)
    // DP SEQUENCE: 30 12 a0 10 ...  (20 bytes)
    //
    // CRLDistributionPoints SEQUENCE OF:
    //   30 28 30 12 a0 10 30 0e 86 0c ... 30 12 a0 10 30 0e 86 0c ...
    // OCTET STRING: 04 2a 30 28 ...
    // OID 2.5.29.31: 06 03 55 1d 1f
    // Extension: 30 31 06 03 55 1d 1f 04 2a 30 28 ...
    const uriA = '687474703a2f2f612e636f6d'; // "http://a.com"
    const uriB = '687474703a2f2f622e636f6d'; // "http://b.com"
    // fullName [0] IMPLICIT replaces the GeneralNames SEQUENCE tag (30 → a0)
    // distributionPoint [0] EXPLICIT wraps the DistributionPointName CHOICE
    const gnA = `860c${uriA}`; // GeneralName [6] IMPLICIT IA5String, 12-byte value  → 14 bytes
    const gnB = `860c${uriB}`;
    const fnA = `a00e${gnA}`; // fullName [0] IMPLICIT (replaces SEQUENCE OF tag)  → 16 bytes
    const fnB = `a00e${gnB}`;
    const dpnA = `a010${fnA}`; // distributionPoint [0] EXPLICIT                    → 18 bytes
    const dpnB = `a010${fnB}`;
    const dpA = `3012${dpnA}`; // DistributionPoint SEQUENCE                        → 20 bytes
    const dpB = `3012${dpnB}`;
    const crlDPs = `3028${dpA}${dpB}`; // CRLDistributionPoints SEQUENCE OF          → 42 bytes
    const octetStr = `042a${crlDPs}`; // extnValue OCTET STRING                     → 44 bytes
    const oid = '0603551d1f'; // OID 2.5.29.31                               →  5 bytes
    const extHex = `3031${oid}${octetStr}`; // Extension SEQUENCE (5+44=49 bytes)

    const ext = AsnParser.parse(Convert.FromHex(extHex), Extension);

    const result = parser.parse(ext);

    expect(result.oid).toBe('2.5.29.31');
    expect(result.children).toHaveLength(2);
    expect(result.children[0]).toEqual({
      title: 'Distribution Points',
      children: [{
        title: 'URI', value: 'http://a.com',
      }],
    });
    expect(result.children[1]).toEqual({
      title: 'Distribution Points',
      children: [{
        title: 'URI', value: 'http://b.com',
      }],
    });
  });
});
