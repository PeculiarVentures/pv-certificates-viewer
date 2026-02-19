/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Convert } from 'pvtsutils';
import { WebGdprAttribute } from './web_gdpr_attribute';

describe('WebGdprAttribute', () => {
  it('should return correct JSON structure', () => {
    /**
     * Name: Web GDPR
     * Assessment Authority: RFC 822 Name: GDPR CAB
     * Assessment Location: URI: https://gdprcab.lu/nowina
     * Assessment Ref: RFC 822 Name: Certificate n°124/2020
     * Data Storage Territory: LU
     * Description: Nowina Solutions has been shown to be GDPR compliant in its signature creation activities
     */
    const hexAttribute = '3081b306050400ca18073181a93081a6a00a81084744505220434142a11881164365727469666963617465206eb03132342f32303230a21b861968747470733a2f2f676470726361622e6c752f6e6f77696e61a30413024c55a45b0c594e6f77696e6120536f6c7574696f6e7320686173206265656e2073686f776e20746f206265204744505220636f6d706c69616e7420696e20697473207369676e6174757265206372656174696f6e2061637469766974696573';
    const attribute = new WebGdprAttribute(Convert.FromHex(hexAttribute));

    const json = attribute.toJSON();

    expect(json).toMatchSnapshot();
  });
});
