import { id_ce_cRLNumber, id_ce_deltaCRLIndicator } from '@peculiar/asn1-x509';
import { makeExtRaw } from '../../../tests/test_utils';
import { CRLDeltaIndicatorParser, CRLNumberParser } from './crl_number';

describe('CRLNumberParser', () => {
  const parser = new CRLNumberParser();

  it('exposes the correct OID', () => {
    expect(parser.oids).toContain(id_ce_cRLNumber);
    expect(parser.oids).toContain('2.5.29.20');
  });

  it('parses CRL number 42', () => {
    // CRLNumber INTEGER = 42 (0x2a): 02 01 2a
    expect(parser.parse(makeExtRaw(id_ce_cRLNumber, '02012a'))).toEqual({
      oid: '2.5.29.20',
      critical: false,
      children: [{
        title: 'CRL Number', value: 42,
      }],
    });
  });
});

describe('CRLDeltaIndicatorParser', () => {
  const parser = new CRLDeltaIndicatorParser();

  it('exposes the correct OID', () => {
    expect(parser.oids).toContain(id_ce_deltaCRLIndicator);
    expect(parser.oids).toContain('2.5.29.27');
  });

  it('parses base CRL number 10', () => {
    // BaseCRLNumber INTEGER = 10: 02 01 0a
    expect(parser.parse(makeExtRaw(id_ce_deltaCRLIndicator, '02010a'))).toEqual({
      oid: '2.5.29.27',
      critical: false,
      children: [{
        title: 'Base CRL Number', value: 10,
      }],
    });
  });
});
