import { id_ce_basicConstraints } from '@peculiar/asn1-x509';
import { makeExtRaw } from '../../../tests/test_utils';
import { BasicConstraintsParser } from './basic_constraints';

describe('BasicConstraintsParser', () => {
  const parser = new BasicConstraintsParser();

  it('exposes the correct OID', () => {
    expect(parser.oids).toEqual([id_ce_basicConstraints]);
  });

  it('parses cA=true with pathLenConstraint=0', () => {
    expect(parser.parse(makeExtRaw(
      id_ce_basicConstraints,
      '30060101ff020100',
      true,
    ))).toEqual({
      oid: '2.5.29.19',
      critical: true,
      children: [
        {
          title: 'CA', value: true,
        },
        {
          title: 'Path Length Constraint', value: 0,
        },
      ],
    });
  });

  it('parses cA=true without pathLenConstraint', () => {
    expect(parser.parse(makeExtRaw(
      id_ce_basicConstraints,
      '30030101ff',
      true,
    ))).toEqual({
      oid: '2.5.29.19',
      critical: true,
      children: [{
        title: 'CA', value: true,
      }],
    });
  });

  it('defaults cA to false when absent', () => {
    expect(parser.parse(makeExtRaw(
      id_ce_basicConstraints,
      '3000',
    ))).toEqual({
      oid: '2.5.29.19',
      critical: false,
      children: [{
        title: 'CA', value: false,
      }],
    });
  });
});
