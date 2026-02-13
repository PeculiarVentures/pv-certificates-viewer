/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Convert } from 'pvtsutils';
import { PrivateKeyUsagePeriodExtension } from './private_key_usage_period_extension';

describe('PrivateKeyUsagePeriodExtension', () => {
  it('should return correct JSON structure', () => {
    /**
     * Name: Private Key Usage Period
     * Critical: No
     * Not Before: 2003-01-08T23:37:23.000Z
     * Not After: 2023-01-09T00:07:23.000Z
     */
    const hexExtension = '302b0603551d1004243022800f32303033303130383233333732335a810f32303233303130393030303732335a';
    const extension = new PrivateKeyUsagePeriodExtension(Convert.FromHex(hexExtension));

    const json = extension.toJSON();

    expect(json).toEqual({
      Name: 'Private Key Usage Period',
      Critical: 'No',
      'Not Before': 'Wed, 08 Jan 2003 23:37:23 GMT',
      'Not After': 'Mon, 09 Jan 2023 00:07:23 GMT',
    });
  });
});
