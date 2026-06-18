import { id_ValuationRanking } from '@peculiar/asn1-ntqwac';
import { makeAttrRaw } from '../../../tests/test_utils';
import { ValuationRankingParser } from './valuation_ranking';

describe('ValuationRankingParser', () => {
  const parser = new ValuationRankingParser();

  it('exposes the correct OID', () => {
    expect(parser.oids).toEqual([id_ValuationRanking]);
  });

  it('formats star ratings as fractions', () => {
    // ValuationRanking: stars5=500, stars4=40, stars3=30, stars2=2, stars1=1
    expect(parser.parse(makeAttrRaw(
      id_ValuationRanking,
      '3010020201f402012802011e020102020101',
    ))).toEqual({
      oid: '0.4.0.9496.9',
      children: [
        {
          title: 'stars5', value: '500/500',
        },
        {
          title: 'stars4', value: '40/50',
        },
        {
          title: 'stars3', value: '30/50',
        },
        {
          title: 'stars2', value: '2/5',
        },
        {
          title: 'stars1', value: '1/5',
        },
      ],
    });
  });
});
