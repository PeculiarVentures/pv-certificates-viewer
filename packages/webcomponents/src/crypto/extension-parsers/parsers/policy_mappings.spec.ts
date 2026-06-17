import { id_ce_policyMappings } from '@peculiar/asn1-x509';
import { makeExtRaw } from '../../../tests/test_utils';
import { PolicyMappingsParser } from './policy_mappings';

describe('PolicyMappingsParser', () => {
  const parser = new PolicyMappingsParser();

  it('exposes the correct OID', () => {
    expect(parser.oids).toContain(id_ce_policyMappings);
    expect(parser.oids).toContain('2.5.29.33');
  });

  it('parses a single policy mapping', () => {
    // PolicyMappings containing one PolicyMapping:
    //   issuerDomainPolicy  = 2.16.840.1.101.3.2.1.3.13
    //   subjectDomainPolicy = 2.16.840.1.101.3.2.1.12.1
    expect(parser.parse(makeExtRaw(
      id_ce_policyMappings,
      '301a3018060a6086480165030201030d060a60864801650302010c01',
      true,
    ))).toEqual({
      oid: '2.5.29.33',
      critical: true,
      children: [
        {
          title: 'Mappings',
          children: [
            {
              title: '',
              children: [
                {
                  title: 'Issuer Domain Policy', value: '2.16.840.1.101.3.2.1.3.13',
                },
                {
                  title: 'Subject Domain Policy', value: '2.16.840.1.101.3.2.1.12.1',
                },
              ],
            },
          ],
        },
      ],
    });
  });

  it('parses multiple policy mappings', () => {
    // Two mappings: 1.2.3→1.2.4 and 1.2.5→1.2.6
    // Computed: 3014300806022a0306022a04300806022a0506022a06
    expect(parser.parse(makeExtRaw(
      id_ce_policyMappings,
      '3014300806022a0306022a04300806022a0506022a06',
    ))).toEqual({
      oid: '2.5.29.33',
      critical: false,
      children: [
        {
          title: 'Mappings',
          children: [
            {
              title: '',
              children: [
                {
                  title: 'Issuer Domain Policy', value: '1.2.3',
                },
                {
                  title: 'Subject Domain Policy', value: '1.2.4',
                },
              ],
            },
            {
              title: '',
              children: [
                {
                  title: 'Issuer Domain Policy', value: '1.2.5',
                },
                {
                  title: 'Subject Domain Policy', value: '1.2.6',
                },
              ],
            },
          ],
        },
      ],
    });
  });
});
