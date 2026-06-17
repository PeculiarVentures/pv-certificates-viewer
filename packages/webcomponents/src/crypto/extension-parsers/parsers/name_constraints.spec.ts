import { id_ce_nameConstraints } from '@peculiar/asn1-x509';
import { makeExtRaw } from '../../../tests/test_utils';
import { NameConstraintsParser } from './name_constraints';

describe('NameConstraintsParser', () => {
  const parser = new NameConstraintsParser();

  it('exposes the correct OID', () => {
    expect(parser.oids).toContain(id_ce_nameConstraints);
    expect(parser.oids).toContain('2.5.29.30');
  });

  it('parses permittedSubtrees and excludedSubtrees with DNS names', () => {
    // NameConstraints:
    //   permittedSubtrees: [{ base: dNSName=.example.com }]
    //   excludedSubtrees:  [{ base: dNSName=.evil.com }]
    expect(parser.parse(makeExtRaw(
      id_ce_nameConstraints,
      '3021a010300e820c2e6578616d706c652e636f6da10d300b82092e6576696c2e636f6d',
      true,
    ))).toEqual({
      oid: '2.5.29.30',
      critical: true,
      children: [
        {
          title: 'Permitted Subtrees',
          children: [
            {
              title: 'DNS Name', value: '.example.com',
            },
          ],
        },
        {
          title: 'Excluded Subtrees',
          children: [
            {
              title: 'DNS Name', value: '.evil.com',
            },
          ],
        },
      ],
    });
  });

  it('includes non-default minimum and optional maximum', () => {
    // GeneralSubtree: dNSName=sub.example.com, minimum=1, maximum=3
    // Computed: 301ba0193017820f7375622e6578616d706c652e636f6d800101810103
    expect(parser.parse(makeExtRaw(
      id_ce_nameConstraints,
      '301ba0193017820f7375622e6578616d706c652e636f6d800101810103',
      true,
    ))).toEqual({
      oid: '2.5.29.30',
      critical: true,
      children: [
        {
          title: 'Permitted Subtrees',
          children: [
            {
              title: 'DNS Name', value: 'sub.example.com',
            },
            {
              title: 'Minimum', value: 1,
            },
            {
              title: 'Maximum', value: 3,
            },
          ],
        },
      ],
    });
  });

  it('handles only permittedSubtrees (no excluded)', () => {
    // permittedSubtrees: [{ base: dNSName=.example.com, minimum=0 }]
    // Computed: 3012a010300e820c2e6578616d706c652e636f6d
    expect(parser.parse(makeExtRaw(
      id_ce_nameConstraints,
      '3012a010300e820c2e6578616d706c652e636f6d',
      true,
    ))).toEqual({
      oid: '2.5.29.30',
      critical: true,
      children: [
        {
          title: 'Permitted Subtrees',
          children: [
            {
              title: 'DNS Name', value: '.example.com',
            },
          ],
        },
      ],
    });
  });
});
