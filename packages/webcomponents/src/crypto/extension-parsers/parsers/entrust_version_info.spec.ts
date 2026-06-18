import { id_entrust_entrustVersInfo } from '@peculiar/asn1-x509';
import { makeExtRaw } from '../../../tests/test_utils';
import { EntrustVersionInfoParser } from './entrust_version_info';

describe('EntrustVersionInfoParser', () => {
  const parser = new EntrustVersionInfoParser();

  it('exposes the correct OID', () => {
    expect(parser.oids).toEqual([id_entrust_entrustVersInfo]);
  });

  it('parses version and flags from a real extension value', () => {
    // Real extension from Adobe Systems Incorporated.cer (test_assets)
    expect(parser.parse(makeExtRaw(
      id_entrust_entrustVersInfo,
      '300e1b0856362e303a342e3003020490',
    ))).toEqual({
      oid: '1.2.840.113533.7.65.0',
      critical: false,
      children: [
        {
          title: 'Version', value: 'V6.0:4.0',
        },
        {
          title: 'Flags', value: 'keyUpdateAllowed',
        },
      ],
    });
  });
});
