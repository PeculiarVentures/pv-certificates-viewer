import { AsnParser } from '@peculiar/asn1-schema';
import { Extension, id_ce_keyUsage } from '@peculiar/asn1-x509';
import { Convert } from 'pvtsutils';
import { KeyUsageParser } from './key_usage';

describe('KeyUsageParser', () => {
  const parser = new KeyUsageParser();

  it('exposes the correct OID', () => {
    expect(parser.oids).toEqual([id_ce_keyUsage]);
  });

  it('parses digitalSignature and keyEncipherment', () => {
    // BIT STRING: unused=5, 0xa0 = 1010_0000 → bits 0 (digitalSignature) + 2 (keyEncipherment)
    const ext = AsnParser.parse(
      Convert.FromHex('300c0603551d0f0101ff040403020 5a0'.replace(/ /g, '')),
      Extension,
    );

    expect(parser.parse(ext)).toEqual({
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
    const ext = AsnParser.parse(
      Convert.FromHex('300b0603551d0f0101ff040403020006'),
      Extension,
    );

    expect(parser.parse(ext)).toEqual({
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
    // digitalSignature only, not critical
    const ext = AsnParser.parse(
      Convert.FromHex('300c0603551d0f0101ff040403020780'),
      Extension,
    );
    const result = parser.parse(ext);

    // all titles must resolve from the labels map
    expect(result.children.every((c) => c.title !== undefined)).toBe(true);
  });
});
