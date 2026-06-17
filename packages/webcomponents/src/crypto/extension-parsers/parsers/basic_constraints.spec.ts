import { AsnParser } from '@peculiar/asn1-schema';
import { Extension, id_ce_basicConstraints } from '@peculiar/asn1-x509';
import { Convert } from 'pvtsutils';
import { BasicConstraintsParser } from './basic_constraints';

describe('BasicConstraintsParser', () => {
  const parser = new BasicConstraintsParser();

  it('exposes the correct OID', () => {
    expect(parser.oids).toEqual([id_ce_basicConstraints]);
  });

  it('parses cA=true with pathLenConstraint=0', () => {
    const ext = AsnParser.parse(
      // SEQUENCE { OID 2.5.29.19, BOOLEAN TRUE (critical), OCTET STRING { SEQUENCE { BOOLEAN TRUE, INTEGER 0 } } }
      Convert.FromHex('30120603551d130101ff040830060101ff020100'),
      Extension,
    );

    expect(parser.parse(ext)).toEqual({
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
    const ext = AsnParser.parse(
      // SEQUENCE { OID 2.5.29.19, BOOLEAN TRUE (critical), OCTET STRING { SEQUENCE { BOOLEAN TRUE } } }
      Convert.FromHex('300f0603551d130101ff040530030101ff'),
      Extension,
    );

    expect(parser.parse(ext)).toEqual({
      oid: '2.5.29.19',
      critical: true,
      children: [{
        title: 'CA', value: true,
      }],
    });
  });

  it('defaults cA to false when absent', () => {
    const ext = AsnParser.parse(
      // SEQUENCE { OID 2.5.29.19, OCTET STRING { SEQUENCE {} } }  — empty BasicConstraints
      Convert.FromHex('30090603551d1304023000'),
      Extension,
    );

    expect(parser.parse(ext)).toEqual({
      oid: '2.5.29.19',
      critical: false,
      children: [{
        title: 'CA', value: false,
      }],
    });
  });
});
