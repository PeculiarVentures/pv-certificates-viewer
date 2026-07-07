import { AsnParser } from '@peculiar/asn1-schema';
import { Convert } from 'pvtsutils';
import { MsCRLNextPublish } from './microsoft_crl_next_publish';

describe('MsCRLNextPublish', () => {
  it('should parse GeneralizedTime next publish date', () => {
    const hex = '180F32303236303730373130303030305A';
    const asn = AsnParser.parse(Convert.FromHex(hex), MsCRLNextPublish);

    expect(asn).toEqual({ nextPublish: '2026-07-07T10:00:00.000Z' });
  });
});
