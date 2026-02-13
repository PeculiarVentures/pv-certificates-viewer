/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Convert } from 'pvtsutils';
import { KeyUsageExtension } from './key_usage_extension';

describe('KeyUsageExtension', () => {
  it('should return correct JSON structure', () => {
    /**
     * Name: Key Usage
     * Critical: Yes
     * Usage: crlSign, digitalSignature, keyCertSign
     */
    const hexExtension = '300e0603551d0f0101ff040403020186';
    const extension = new KeyUsageExtension(Convert.FromHex(hexExtension));

    const json = extension.toJSON();

    expect(json).toEqual({
      Name: 'Key Usage',
      Critical: 'Yes',
      Usage: 'crlSign, digitalSignature, keyCertSign',
    });
  });
});
