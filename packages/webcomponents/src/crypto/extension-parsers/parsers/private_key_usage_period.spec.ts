import { id_ce_privateKeyUsagePeriod } from '@peculiar/asn1-x509';
import { makeExtRaw } from '../../../tests/test_utils';
import { PrivateKeyUsagePeriodParser } from './private_key_usage_period';

describe('PrivateKeyUsagePeriodParser', () => {
  const parser = new PrivateKeyUsagePeriodParser();

  it('exposes the correct OID', () => {
    expect(parser.oids).toEqual([id_ce_privateKeyUsagePeriod]);
  });

  it('parses notBefore and notAfter', () => {
    // PrivateKeyUsagePeriod: notBefore=2020-01-01, notAfter=2025-01-01
    // 30 22
    //   80 0f 32303230303130313030303030305a  (notBefore [0])
    //   81 0f 32303235303130313030303030305a  (notAfter  [1])
    expect(parser.parse(makeExtRaw(
      id_ce_privateKeyUsagePeriod,
      '3022800f32303230303130313030303030305a810f32303235303130313030303030305a',
    ))).toEqual({
      oid: '2.5.29.16',
      critical: false,
      children: [
        {
          title: 'Not Before', value: 'Wed, 01 Jan 2020 00:00:00 GMT',
        },
        {
          title: 'Not After', value: 'Wed, 01 Jan 2025 00:00:00 GMT',
        },
      ],
    });
  });

  it('parses notAfter only', () => {
    // notAfter = 2030-06-15T00:00:00.000Z
    // Computed: 3011810f32303330303631353030303030305a
    expect(parser.parse(makeExtRaw(
      id_ce_privateKeyUsagePeriod,
      '3011810f32303330303631353030303030305a',
    ))).toEqual({
      oid: '2.5.29.16',
      critical: false,
      children: [
        {
          title: 'Not After', value: 'Sat, 15 Jun 2030 00:00:00 GMT',
        },
      ],
    });
  });
});
