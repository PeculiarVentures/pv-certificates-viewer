import { id_pe_qcStatements } from '@peculiar/asn1-x509-qualified';
import { makeExtRaw } from '../../../tests/test_utils';
import { QCStatementsParser } from './qc_statements';

describe('QCStatementsParser', () => {
  const parser = new QCStatementsParser();

  it('exposes the correct OID', () => {
    expect(parser.oids).toContain(id_pe_qcStatements);
    expect(parser.oids).toContain('1.3.6.1.5.5.7.1.3');
  });

  it('parses pkixQCSyntax-v2 with semanticsIdentifier', () => {
    // QCStatements: [{ statementId=1.3.6.1.5.5.7.11.2 (PKIX QC Syntax V2),
    //                  statementInfo=SemanticsInfo(0.4.0.194121.1.1) }]
    expect(parser.parse(makeExtRaw(
      id_pe_qcStatements,
      '3017301506082b06010505070b023009060704008bec490101',
    ))).toEqual({
      oid: '1.3.6.1.5.5.7.1.3',
      critical: false,
      children: [
        {
          title: 'Statements',
          children: [
            {
              title: '',
              children: [
                {
                  title: 'Statement', value: '1.3.6.1.5.5.7.11.2',
                },
                {
                  title: 'Semantics Identifier', value: '0.4.0.194121.1.1',
                },
              ],
            },
          ],
        },
      ],
    });
  });

  it('parses qcType statement', () => {
    // QCStatements: [{ statementId=0.4.0.1862.1.6 (ETSI QC Type),
    //                  statementInfo=QcType([0.4.0.1862.1.6.1]) }]
    expect(parser.parse(makeExtRaw(
      id_pe_qcStatements,
      '30153013060604008e4601063009060704008e46010601',
    ))).toEqual({
      oid: '1.3.6.1.5.5.7.1.3',
      critical: false,
      children: [
        {
          title: 'Statements',
          children: [
            {
              title: '',
              children: [
                {
                  title: 'Statement', value: '0.4.0.1862.1.6',
                },
                {
                  title: 'QC Types', value: 'ETSI QC Type eSign',
                },
              ],
            },
          ],
        },
      ],
    });
  });

  it('falls back to hex for unknown statement info', () => {
    // QCStatement { statementId=1.2.3.4.5, statementInfo=BOOLEAN TRUE (0101ff) }
    // Computed: 300b300906042a0304050101ff
    expect(parser.parse(makeExtRaw(
      id_pe_qcStatements,
      '300b300906042a0304050101ff',
    ))).toEqual({
      oid: '1.3.6.1.5.5.7.1.3',
      critical: false,
      children: [
        {
          title: 'Statements',
          children: [
            {
              title: '',
              children: [
                {
                  title: 'Statement', value: '1.2.3.4.5',
                },
                {
                  title: 'Info', value: '0101ff',
                },
              ],
            },
          ],
        },
      ],
    });
  });

  it('produces empty children for statement with no info', () => {
    // QCStatement { statementId=1.3.6.1.5.5.7.11.3 (pkixQCSyntax-v3), no info }
    // Computed: 300c300a06082b06010505070b03
    expect(parser.parse(makeExtRaw(
      id_pe_qcStatements,
      '300c300a06082b06010505070b03',
    ))).toEqual({
      oid: '1.3.6.1.5.5.7.1.3',
      critical: false,
      children: [
        {
          title: 'Statements',
          children: [
            {
              title: '',
              children: [
                {
                  title: 'Statement', value: '1.3.6.1.5.5.7.11.3',
                },
              ],
            },
          ],
        },
      ],
    });
  });
});
