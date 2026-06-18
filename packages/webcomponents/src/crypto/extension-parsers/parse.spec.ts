import { id_ce_basicConstraints } from '@peculiar/asn1-x509';
import { makeExtRaw } from '../../tests/test_utils';
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
    expect(parseExtension(
      makeExtRaw(id_ce_basicConstraints, '30060101ff020100', true),
      makeRegistry(),
    )).toEqual({
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
    expect(parseExtension(
      makeExtRaw('1.2.3.4.5', '01020304'),
      makeRegistry(),
    )).toEqual({
      oid: '1.2.3.4.5',
      critical: false,
      children: [{
        title: 'Raw Value', value: '01020304',
      }],
    });
  });

  it('falls back to unknown when the parser throws', () => {
    expect(parseExtension(
      makeExtRaw(id_ce_basicConstraints, '0101010101'),
      makeRegistry(),
    )).toEqual({
      oid: '2.5.29.19',
      critical: false,
      children: [{
        title: 'Raw Value', value: '0101010101',
      }],
    });
  });
});
