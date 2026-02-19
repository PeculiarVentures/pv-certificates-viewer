/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Convert } from 'pvtsutils';
import { ChallengePasswordAttribute } from './challenge_password_attribute';

describe('ChallengePasswordAttribute', () => {
  it('should return correct JSON structure', () => {
    /**
     * Name: Challenge Password
     * Value: testpassword
     */
    const hexAttribute = '301b06092a864886f70d010907310e130c7465737470617373776f7264';
    const attribute = new ChallengePasswordAttribute(Convert.FromHex(hexAttribute));

    const json = attribute.toJSON();

    expect(json).toMatchSnapshot();
  });
});
