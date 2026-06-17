import { id_ce_cRLReasons } from '@peculiar/asn1-x509';
import { makeExtRaw } from '../../../tests/test_utils';
import { CRLReasonParser } from './crl_reason';

describe('CRLReasonParser', () => {
  const parser = new CRLReasonParser();

  it('exposes the correct OID', () => {
    expect(parser.oids).toContain(id_ce_cRLReasons);
    expect(parser.oids).toContain('2.5.29.21');
  });

  it('parses keyCompromise reason', () => {
    // CRLReason ENUMERATED = 1 (keyCompromise): 0a 01 01
    expect(parser.parse(makeExtRaw(id_ce_cRLReasons, '0a0101'))).toEqual({
      oid: '2.5.29.21',
      critical: false,
      children: [{
        title: 'Reason', value: 'keyCompromise',
      }],
    });
  });

  it('parses unspecified reason', () => {
    // CRLReason ENUMERATED = 0: 0a 01 00
    expect(parser.parse(makeExtRaw(id_ce_cRLReasons, '0a0100'))).toEqual({
      oid: '2.5.29.21',
      critical: false,
      children: [{
        title: 'Reason', value: 'unspecified',
      }],
    });
  });

  it('parses cessationOfOperation reason', () => {
    // CRLReason ENUMERATED = 5: 0a 01 05
    expect(parser.parse(makeExtRaw(id_ce_cRLReasons, '0a0105'))).toEqual({
      oid: '2.5.29.21',
      critical: false,
      children: [{
        title: 'Reason', value: 'cessationOfOperation',
      }],
    });
  });
});
