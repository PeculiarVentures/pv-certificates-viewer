/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Convert } from 'pvtsutils';
import { ValuationRankingAttribute } from './valuation_ranking_attribute';

describe('ValuationRankingAttribute', () => {
  it('should return correct JSON structure', () => {
    /**
     * Name: Valuation Ranking
     * stars5: 500, stars4: 40, stars3: 30, stars2: 2, stars1: 1
     */
    const hexAttribute = '301b06050400ca180931123010020201f402012802011e020102020101';
    const attribute = new ValuationRankingAttribute(Convert.FromHex(hexAttribute));

    const json = attribute.toJSON();

    expect(json).toMatchSnapshot();
  });
});
