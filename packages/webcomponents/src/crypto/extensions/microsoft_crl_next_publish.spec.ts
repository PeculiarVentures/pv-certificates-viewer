import { AsnParser } from '@peculiar/asn1-schema';
import { hex } from '@peculiar/utils/encoding';
import { describe, it, expect } from 'vitest';
import { MsCRLNextPublish } from './microsoft_crl_next_publish';

describe('MsCRLNextPublish', () => {
  it('should parse GeneralizedTime next publish date', () => {
    const valueHex = '180F32303236303730373130303030305A';
    const asn = AsnParser.parse(hex.decode(valueHex), MsCRLNextPublish);

    expect(asn).toEqual({ nextPublish: '2026-07-07T10:00:00.000Z' });
  });
});
