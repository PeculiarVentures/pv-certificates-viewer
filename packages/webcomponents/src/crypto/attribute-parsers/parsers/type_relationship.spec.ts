import { id_TypeRelationship } from '@peculiar/asn1-ntqwac';
import { makeAttrRaw } from '../../../tests/test_utils';
import { TypeRelationshipParser } from './type_relationship';

describe('TypeRelationshipParser', () => {
  const parser = new TypeRelationshipParser();

  it('exposes the correct OID', () => {
    expect(parser.oids).toEqual([id_TypeRelationship]);
  });

  it('parses relationship flags as Yes/No', () => {
    // TypeRelationship: DNBvsDNO, DNBvsDNT, DNOvsDNT all true
    expect(parser.parse(makeAttrRaw(
      id_TypeRelationship,
      '3012a00403020780a10403020780a20403020780',
    ))).toEqual({
      oid: '0.4.0.9496.5',
      children: [
        {
          title: 'DNBvsDNO', value: 'Yes',
        },
        {
          title: 'DNBvsDNT', value: 'Yes',
        },
        {
          title: 'DNOvsDNT', value: 'Yes',
        },
      ],
    });
  });
});
