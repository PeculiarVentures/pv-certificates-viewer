import { Extension, id_ce_extKeyUsage } from '@peculiar/asn1-x509';
import { makeExtRaw } from '../../../tests/test_utils';
import { ExtendedKeyUsageParser } from './extended_key_usage';

describe('ExtendedKeyUsageParser', () => {
  const parser = new ExtendedKeyUsageParser();

  it('exposes the correct OID', () => {
    expect(parser.oids).toContain(id_ce_extKeyUsage);
    expect(parser.oids).toContain('2.5.29.37');
  });

  it('parses serverAuth and clientAuth', () => {
    // ExtendedKeyUsage: SEQUENCE { OID serverAuth, OID clientAuth }
    // 1.3.6.1.5.5.7.3.1 + 1.3.6.1.5.5.7.3.2
    expect(parser.parse(makeExtRaw(
      id_ce_extKeyUsage,
      '301406082b0601050507030106082b06010505070302',
    ))).toEqual({
      oid: '2.5.29.37',
      critical: false,
      children: [
        {
          title: 'Purposes',
          children: [
            {
              title: 'Purpose', value: '1.3.6.1.5.5.7.3.1',
            },
            {
              title: 'Purpose', value: '1.3.6.1.5.5.7.3.2',
            },
          ],
        },
      ],
    });
  });

  it('parses an unknown key purpose OID', () => {
    // ExtendedKeyUsage: SEQUENCE { OID 1.2.3.4.5 }
    expect(parser.parse(makeExtRaw(
      id_ce_extKeyUsage,
      '300606042a030405',
    ))).toEqual({
      oid: '2.5.29.37',
      critical: false,
      children: [
        {
          title: 'Purposes',
          children: [
            {
              title: 'Purpose', value: '1.2.3.4.5',
            },
          ],
        },
      ],
    });
  });
});
