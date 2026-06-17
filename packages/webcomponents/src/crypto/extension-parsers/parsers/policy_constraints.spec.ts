import { id_ce_policyConstraints } from '@peculiar/asn1-x509';
import { makeExtRaw } from '../../../tests/test_utils';
import { PolicyConstraintsParser } from './policy_constraints';

describe('PolicyConstraintsParser', () => {
  const parser = new PolicyConstraintsParser();

  it('exposes the correct OID', () => {
    expect(parser.oids).toContain(id_ce_policyConstraints);
    expect(parser.oids).toContain('2.5.29.36');
  });

  it('parses both requireExplicitPolicy and inhibitPolicyMapping', () => {
    // SEQUENCE { [0] INTEGER 2, [1] INTEGER 0 }
    // 30 06  80 01 02  81 01 00
    expect(parser.parse(makeExtRaw(id_ce_policyConstraints, '30068001028101 00'.replace(/\s/g, ''), true))).toEqual({
      oid: '2.5.29.36',
      critical: true,
      children: [
        {
          title: 'Require Explicit Policy', value: 2,
        },
        {
          title: 'Inhibit Policy Mapping', value: 0,
        },
      ],
    });
  });

  it('parses only requireExplicitPolicy when inhibitPolicyMapping is absent', () => {
    // SEQUENCE { [0] INTEGER 0 }  →  30 03  80 01 00
    expect(parser.parse(makeExtRaw(id_ce_policyConstraints, '3003800100', true))).toEqual({
      oid: '2.5.29.36',
      critical: true,
      children: [
        {
          title: 'Require Explicit Policy', value: 0,
        },
      ],
    });
  });

  it('parses only inhibitPolicyMapping when requireExplicitPolicy is absent', () => {
    // SEQUENCE { [1] INTEGER 1 }  →  30 03  81 01 01
    expect(parser.parse(makeExtRaw(id_ce_policyConstraints, '3003810101', true))).toEqual({
      oid: '2.5.29.36',
      critical: true,
      children: [
        {
          title: 'Inhibit Policy Mapping', value: 1,
        },
      ],
    });
  });

  it('decodes multi-byte integer values correctly', () => {
    // requireExplicitPolicy = 300 (0x012C)  →  [0] 80 02 01 2c
    // SEQUENCE { [0] 80 02 01 2c }  →  30 04 80 02 01 2c
    expect(parser.parse(makeExtRaw(id_ce_policyConstraints, '3004800201 2c'.replace(/\s/g, ''), true))).toEqual({
      oid: '2.5.29.36',
      critical: true,
      children: [
        {
          title: 'Require Explicit Policy', value: 300,
        },
      ],
    });
  });
});
