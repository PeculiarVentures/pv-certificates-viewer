import { id_netscapeComment, id_netscapeCertType } from '@peculiar/asn1-x509-netscape';
import { makeExtRaw } from '../../../tests/test_utils';
import { NetscapeCommentParser, NetscapeCertTypeParser } from './netscape';

describe('NetscapeCommentParser', () => {
  const parser = new NetscapeCommentParser();

  it('exposes the correct OID', () => {
    expect(parser.oids).toContain(id_netscapeComment);
    expect(parser.oids).toContain('2.16.840.1.113730.1.13');
  });

  it('parses a comment string', () => {
    // NetscapeComment IA5String = "Test comment"
    // 16 0c 5465737420636f6d6d656e74
    expect(parser.parse(makeExtRaw(id_netscapeComment, '160c5465737420636f6d6d656e74'))).toEqual({
      oid: '2.16.840.1.113730.1.13',
      critical: false,
      children: [{
        title: 'Comment', value: 'Test comment',
      }],
    });
  });
});

describe('NetscapeCertTypeParser', () => {
  const parser = new NetscapeCertTypeParser();

  it('exposes the correct OID', () => {
    expect(parser.oids).toContain(id_netscapeCertType);
    expect(parser.oids).toContain('2.16.840.1.113730.1.1');
  });

  it('parses sslClient flag', () => {
    // BitString: bit 0 set → 10000000 = 0x80, 7 unused bits: 03 02 07 80
    expect(parser.parse(makeExtRaw(id_netscapeCertType, '03020780'))).toEqual({
      oid: '2.16.840.1.113730.1.1',
      critical: false,
      children: [{
        title: 'Type', value: 'sslClient',
      }],
    });
  });

  it('parses sslClient + sslServer flags', () => {
    // Bits 0+1 set → 11000000 = 0xc0, 6 unused bits: 03 02 06 c0
    expect(parser.parse(makeExtRaw(id_netscapeCertType, '030206c0'))).toEqual({
      oid: '2.16.840.1.113730.1.1',
      critical: false,
      children: [{
        title: 'Type', value: 'sslClient, sslServer',
      }],
    });
  });
});
