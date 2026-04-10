import { AsnParser } from '@peculiar/asn1-schema';
import { Convert } from 'pvtsutils';
import { AppleDeveloperIdDate } from './apple_developer_id_date';

describe('AppleDeveloperIdDate', () => {
  it('should parse UTF8String date', () => {
    const hex = '0C0F32303135303832393030303030305A';
    const asn = AsnParser.parse(Convert.FromHex(hex), AppleDeveloperIdDate);

    expect(asn).toEqual({ date: '2015-08-29T00:00:00.000Z' });
  });
});
