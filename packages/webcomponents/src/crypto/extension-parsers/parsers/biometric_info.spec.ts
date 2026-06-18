import { id_pe_biometricInfo } from '@peculiar/asn1-x509-qualified';
import { makeExtRaw } from '../../../tests/test_utils';
import { BiometricInfoParser } from './biometric_info';

describe('BiometricInfoParser', () => {
  const parser = new BiometricInfoParser();

  it('exposes the correct OIDs', () => {
    expect(parser.oids).toContain(id_pe_biometricInfo);
    expect(parser.oids).toContain('1.3.6.1.5.5.7.1.2');
    expect(parser.oids).toContain('2.16.724.1.2.2.4.1');
  });

  it('parses a biometric entry with predefined type picture', () => {
    // BiometricSyntax: type=picture(0), hashAlg=SHA-256 (2.16.840.1.101.3.4.2.1), hash=deadbeef01020304
    // Computed: 301c301a020100300b06096086480165030402010408deadbeef01020304
    expect(parser.parse(makeExtRaw(
      id_pe_biometricInfo,
      '301c301a020100300b06096086480165030402010408deadbeef01020304',
    ))).toEqual({
      oid: id_pe_biometricInfo,
      critical: false,
      children: [
        {
          title: 'Biometrics',
          children: [
            {
              title: '',
              children: [
                {
                  title: 'Type', value: 'Picture',
                },
                {
                  title: 'Hash Algorithm', value: '2.16.840.1.101.3.4.2.1',
                },
                {
                  title: 'Hash', value: 'deadbeef01020304',
                },
              ],
            },
          ],
        },
      ],
    });
  });

  it('parses sourceDataUri when present', () => {
    // BiometricSyntax: type=handwrittenSignature(1), hashAlg=SHA-1 (1.3.14.3.2.26),
    //                  hash=aabbccdd, sourceDataUri=http://example.com/bio.dat
    // Computed: 3030302e020101300706052b0e03021a0404aabbccdd161a687474703a2f2f6578616d706c652e636f6d2f62696f2e646174
    expect(parser.parse(makeExtRaw(
      id_pe_biometricInfo,
      '3030302e020101300706052b0e03021a0404aabbccdd161a687474703a2f2f6578616d706c652e636f6d2f62696f2e646174',
    ))).toEqual({
      oid: id_pe_biometricInfo,
      critical: false,
      children: [
        {
          title: 'Biometrics',
          children: [
            {
              title: '',
              children: [
                {
                  title: 'Type', value: 'Handwritten Signature',
                },
                {
                  title: 'Hash Algorithm', value: '1.3.14.3.2.26',
                },
                {
                  title: 'Hash', value: 'aabbccdd',
                },
                {
                  title: 'Source URI', value: 'http://example.com/bio.dat',
                },
              ],
            },
          ],
        },
      ],
    });
  });
});
