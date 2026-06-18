import { id_ce_inhibitAnyPolicy } from '@peculiar/asn1-x509';
import { makeExtRaw } from '../../../tests/test_utils';
import { InhibitAnyPolicyParser } from './inhibit_any_policy';

describe('InhibitAnyPolicyParser', () => {
  const parser = new InhibitAnyPolicyParser();

  it('exposes the correct OID', () => {
    expect(parser.oids).toEqual([id_ce_inhibitAnyPolicy]);
  });

  it('parses skip certs = 2', () => {
    // INTEGER 2: 02 01 02
    expect(parser.parse(makeExtRaw(id_ce_inhibitAnyPolicy, '020102', true))).toEqual({
      oid: '2.5.29.54',
      critical: true,
      children: [{
        title: 'Skip Certs', value: 2,
      }],
    });
  });

  it('parses skip certs = 0', () => {
    expect(parser.parse(makeExtRaw(id_ce_inhibitAnyPolicy, '020100', true))).toEqual({
      oid: '2.5.29.54',
      critical: true,
      children: [{
        title: 'Skip Certs', value: 0,
      }],
    });
  });
});
