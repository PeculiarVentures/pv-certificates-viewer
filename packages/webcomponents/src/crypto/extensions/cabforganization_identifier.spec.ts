import { AsnParser } from '@peculiar/asn1-schema';
import { Convert } from 'pvtsutils';
import { CabforganizationIdentifier } from './cabforganization_identifier';

describe('CabforganizationIdentifier', () => {
  it('should parse', () => {
    const hex = '300C1303464F4F130246520C0131';
    const asn = AsnParser.parse(Convert.FromHex(hex), CabforganizationIdentifier);

    expect(asn).toEqual({
      registrationSchemeIdentifier: 'FOO',
      registrationReference: '1',
      registrationCountry: 'FR',
    });
  });
});
