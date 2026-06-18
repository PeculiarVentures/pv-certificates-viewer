import { id_at_statementOfPossession } from '@peculiar/asn1-private-key-stmt';
import { makeAttrRaw } from '../../../tests/test_utils';
import { PrivateKeyPossessionStatementParser } from './private_key_possession_statement';

describe('PrivateKeyPossessionStatementParser', () => {
  const parser = new PrivateKeyPossessionStatementParser();

  it('exposes the correct OID', () => {
    expect(parser.oids).toEqual([id_at_statementOfPossession]);
    expect(parser.oids).toContain('1.3.6.1.4.1.22112.2.1');
  });

  it('parses signer serial number and issuer name', () => {
    // PrivateKeyPossessionStatement: issuer CN=Test CA, serialNumber=01020304
    expect(parser.parse(makeAttrRaw(
      id_at_statementOfPossession,
      '301c301a30123110300e06035504030c0754657374204341020401020304',
    ))).toEqual({
      oid: '1.3.6.1.4.1.22112.2.1',
      children: [
        {
          title: 'Serial Number', value: '01020304',
        },
        {
          title: 'Issuer',
          children: [{
            title: 'Common Name', value: 'Test CA',
          }],
        },
      ],
    });
  });
});
