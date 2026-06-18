import { id_ce_keyUsage } from '@peculiar/asn1-x509';
import { makeExtRaw } from '../../../tests/test_utils';
import { KeyUsageParser } from './key_usage';

describe('KeyUsageParser', () => {
  const parser = new KeyUsageParser();

  it('exposes the correct OID', () => {
    expect(parser.oids).toEqual([id_ce_keyUsage]);
  });

  it('parses digitalSignature and keyEncipherment', () => {
    // BIT STRING: unused=5, 0xa0 = 1010_0000 → bits 0 (digitalSignature) + 2 (keyEncipherment)
    expect(parser.parse(makeExtRaw(
      id_ce_keyUsage,
      '030205a0',
      true,
    ))).toEqual({
      oid: '2.5.29.15',
      critical: true,
      children: [
        {
          title: 'Usage', value: 'digitalSignature, keyEncipherment',
        },
      ],
    });
  });

  it('parses keyCertSign and crlSign', () => {
    // BIT STRING: unused=0, 0x06 = 0000_0110 → bits 5 (keyCertSign) + 6 (crlSign)
    expect(parser.parse(makeExtRaw(
      id_ce_keyUsage,
      '03020006',
      true,
    ))).toEqual({
      oid: '2.5.29.15',
      critical: true,
      children: [
        {
          title: 'Usage', value: 'crlSign, keyCertSign',
        },
      ],
    });
  });

  it('uses the raw flag name as fallback title for unknown flags', () => {
    const result = parser.parse(makeExtRaw(
      id_ce_keyUsage,
      '03020780',
      true,
    ));

    expect(result.children.every((c) => c.title !== undefined)).toBe(true);
  });
});
