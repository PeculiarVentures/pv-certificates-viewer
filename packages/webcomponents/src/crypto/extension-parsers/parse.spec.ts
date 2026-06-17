import { AsnParser } from '@peculiar/asn1-schema';
import { Extension } from '@peculiar/asn1-x509';
import { Convert } from 'pvtsutils';
import { parseExtension } from './parse';
import { ExtensionParserRegistry } from './registry';
import { BasicConstraintsParser } from './parsers/basic_constraints';

function makeRegistry(): ExtensionParserRegistry {
  const r = new ExtensionParserRegistry();

  r.register(new BasicConstraintsParser());

  return r;
}

describe('parseExtension', () => {
  it('dispatches to the matching parser for a known OID', () => {
    // BasicConstraints: cA=true, pathLen=0, critical=true
    const ext = AsnParser.parse(
      Convert.FromHex('30120603551d130101ff040830060101ff020100'),
      Extension,
    );

    expect(parseExtension(ext, makeRegistry())).toEqual({
      oid: '2.5.29.19',
      critical: true,
      children: [
        {
          title: 'CA', value: true,
        },
        {
          title: 'Path Length Constraint', value: 0,
        },
      ],
    });
  });

  it('falls back to unknown when OID has no registered parser', () => {
    // OID 1.2.3.4.5, not critical, value = 01020304
    const ext = AsnParser.parse(
      Convert.FromHex('300c06042a030405040401020304'),
      Extension,
    );

    expect(parseExtension(ext, makeRegistry())).toEqual({
      oid: '1.2.3.4.5',
      critical: false,
      children: [{
        title: 'Raw Value', value: '01020304',
      }],
    });
  });

  it('falls back to unknown when the parser throws', () => {
    // OID 2.5.29.19 (BasicConstraints) but extnValue is not valid BasicConstraints DER
    const ext = AsnParser.parse(
      Convert.FromHex('300c0603551d1304050101010101'),
      Extension,
    );

    expect(parseExtension(ext, makeRegistry())).toEqual({
      oid: '2.5.29.19',
      critical: false,
      children: [{
        title: 'Raw Value', value: '0101010101',
      }],
    });
  });
});
