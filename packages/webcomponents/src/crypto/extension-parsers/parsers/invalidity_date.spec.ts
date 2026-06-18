import { id_ce_invalidityDate } from '@peculiar/asn1-x509';
import { makeExtRaw } from '../../../tests/test_utils';
import { InvalidityDateParser } from './invalidity_date';

describe('InvalidityDateParser', () => {
  const parser = new InvalidityDateParser();

  it('exposes the correct OID', () => {
    expect(parser.oids).toContain(id_ce_invalidityDate);
    expect(parser.oids).toContain('2.5.29.24');
  });

  it('parses a GeneralizedTime date', () => {
    // InvalidityDate GeneralizedTime = "20230115120000Z"
    // 18 0f 32303233303131353132303030305a
    expect(parser.parse(makeExtRaw(
      id_ce_invalidityDate,
      '180f32303233303131353132303030305a',
    ))).toEqual({
      oid: '2.5.29.24',
      critical: false,
      children: [{
        title: 'Invalidity Date', value: 'Sun, 15 Jan 2023 12:00:00 GMT',
      }],
    });
  });
});
