/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Convert } from 'pvtsutils';
import { InsuranceValueAttribute } from './insurance_value_attribute';

describe('InsuranceValueAttribute', () => {
  it('should return correct JSON structure', () => {
    /**
     * Name: Insurance Value
     * Value: 1000 * 10^2 EUR
     */
    const hexAttribute = '301706050400ca1808310e300c1303455552020203e8020102';
    const attribute = new InsuranceValueAttribute(Convert.FromHex(hexAttribute));

    const json = attribute.toJSON();

    expect(json).toEqual({
      Name: 'Insurance Value',
      Value: '1000 * 10^2 EUR',
    });
  });
});
