import { id_ce_issuingDistributionPoint } from '@peculiar/asn1-x509';
import { makeExtRaw } from '../../../tests/test_utils';
import { IssuingDistributionPointParser } from './issuing_distribution_point';

describe('IssuingDistributionPointParser', () => {
  const parser = new IssuingDistributionPointParser();

  it('exposes the correct OID', () => {
    expect(parser.oids).toEqual([id_ce_issuingDistributionPoint]);
  });

  it('parses onlyContainsCACerts flag', () => {
    // IssuingDistributionPoint { onlyContainsCACerts: TRUE }
    // [2] BOOLEAN TRUE: 82 01 ff  →  SEQUENCE: 30 03 82 01 ff
    expect(parser.parse(makeExtRaw(id_ce_issuingDistributionPoint, '30038201ff', true))).toEqual({
      oid: '2.5.29.28',
      critical: true,
      children: [{
        title: 'Only Contains CA Certs', value: true,
      }],
    });
  });

  it('parses onlyContainsUserCerts flag', () => {
    // [1] BOOLEAN TRUE: 81 01 ff  →  SEQUENCE: 30 03 81 01 ff
    expect(parser.parse(makeExtRaw(id_ce_issuingDistributionPoint, '300381 01ff'.replace(/\s/g, ''), true))).toEqual({
      oid: '2.5.29.28',
      critical: true,
      children: [{
        title: 'Only Contains User Certs', value: true,
      }],
    });
  });

  it('parses distributionPoint with URI', () => {
    // IssuingDistributionPoint { distributionPoint: fullName=[URI=http://crl.example.com/crl.crl] }
    // Computed: 3024a022a020861e687474703a2f2f63726c2e6578616d706c652e636f6d2f63726c2e63726c
    expect(parser.parse(makeExtRaw(
      id_ce_issuingDistributionPoint,
      '3024a022a020861e687474703a2f2f63726c2e6578616d706c652e636f6d2f63726c2e63726c',
      true,
    ))).toEqual({
      oid: '2.5.29.28',
      critical: true,
      children: [
        {
          title: 'Distribution Point',
          children: [{
            title: 'URI', value: 'http://crl.example.com/crl.crl',
          }],
        },
      ],
    });
  });

  it('emits no children for all-default values', () => {
    // Empty SEQUENCE: 30 00
    expect(parser.parse(makeExtRaw(id_ce_issuingDistributionPoint, '3000', true))).toEqual({
      oid: '2.5.29.28',
      critical: true,
      children: [],
    });
  });
});
