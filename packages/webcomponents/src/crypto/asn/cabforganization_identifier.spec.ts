import { AsnParser } from '@peculiar/asn1-schema';
import { hex } from '@peculiar/utils/encoding';
import { describe, it, expect } from 'vitest';
import { CabforganizationIdentifier } from './cabforganization_identifier';

describe('CabforganizationIdentifier', () => {
  it('should parse', () => {
    const valueHex = '300C1303464F4F130246520C0131';
    const asn = AsnParser.parse(hex.decode(valueHex), CabforganizationIdentifier);

    expect(asn).toEqual({
      registrationSchemeIdentifier: 'FOO',
      registrationReference: '1',
      registrationCountry: 'FR',
    });
  });
});
