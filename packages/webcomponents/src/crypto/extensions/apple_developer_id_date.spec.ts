import { AsnParser } from '@peculiar/asn1-schema';
import { hex } from '@peculiar/utils/encoding';
import { describe, it, expect } from 'vitest';
import { AppleDeveloperIdDate } from './apple_developer_id_date';

describe('AppleDeveloperIdDate', () => {
  it('should parse UTF8String date', () => {
    const valueHex = '0C0F32303135303832393030303030305A';
    const asn = AsnParser.parse(hex.decode(valueHex), AppleDeveloperIdDate);

    expect(asn).toEqual({ date: '2015-08-29T00:00:00.000Z' });
  });
});
