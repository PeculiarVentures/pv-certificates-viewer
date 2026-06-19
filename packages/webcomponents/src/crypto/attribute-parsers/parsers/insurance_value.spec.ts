import { id_InsuranceValue } from '@peculiar/asn1-ntqwac';
import { makeAttrRaw } from '../../../tests/test_utils';
import { InsuranceValueParser } from './insurance_value';

describe('InsuranceValueParser', () => {
  const parser = new InsuranceValueParser();

  it('exposes the correct OID', () => {
    expect(parser.oids).toEqual([id_InsuranceValue]);
  });

  it('formats base, degree, and currency location', () => {
    // InsuranceValue: location=EUR, base=1000, degree=2
    expect(parser.parse(makeAttrRaw(
      id_InsuranceValue,
      '300c1303455552020203e8020102',
    ))).toEqual({
      oid: '0.4.0.9496.8',
      children: [{
        title: 'Value', value: '1000 * 10^2 EUR',
      }],
    });
  });
});
