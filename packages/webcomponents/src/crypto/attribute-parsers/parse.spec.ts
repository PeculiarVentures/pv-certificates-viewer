import { makeAttrRaw } from '../../tests/test_utils';
import { parseAttribute } from './parse';
import { AttributeParserRegistry } from './registry';
import { ChallengePasswordParser } from './parsers/pkcs9';

function makeRegistry(): AttributeParserRegistry {
  const r = new AttributeParserRegistry();

  r.register(new ChallengePasswordParser());

  return r;
}

describe('parseAttribute', () => {
  it('dispatches to the matching parser for a known OID', () => {
    // ChallengePassword UTF8String "secret"
    expect(parseAttribute(
      makeAttrRaw('1.2.840.113549.1.9.7', '0c06736563726574'),
      makeRegistry(),
    )).toEqual({
      oid: '1.2.840.113549.1.9.7',
      children: [{
        title: 'Value', value: 'secret',
      }],
    });
  });

  it('falls back to unknown when OID has no registered parser', () => {
    expect(parseAttribute(
      makeAttrRaw('1.2.3.4.5', '01020304'),
      makeRegistry(),
    )).toEqual({
      oid: '1.2.3.4.5',
      children: [{
        title: 'Raw Value', value: '01020304',
      }],
    });
  });

  it('falls back to unknown when the parser throws', () => {
    // OID 1.2.840.113549.1.9.7 (ChallengePassword) but value is not valid DER
    expect(parseAttribute(
      makeAttrRaw('1.2.840.113549.1.9.7', '0101010101'),
      makeRegistry(),
    )).toEqual({
      oid: '1.2.840.113549.1.9.7',
      children: [{
        title: 'Raw Value', value: '0101010101',
      }],
    });
  });
});
