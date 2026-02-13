/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Convert } from 'pvtsutils';
import { ExtendedKeyUsageExtension } from './extended_key_usage_extension';

describe('ExtendedKeyUsageExtension', () => {
  it('should return correct JSON structure', () => {
    /**
     * Name: Extended Key Usage
     * Critical: No
     * Purposes: Array of purpose objects
     */
    const hexExtension = '301d0603551d250416301406082b0601050507030206082b06010505070304';
    const extension = new ExtendedKeyUsageExtension(Convert.FromHex(hexExtension));

    const json = extension.toJSON();

    expect(json).toEqual({
      Name: 'Extended Key Usage',
      Critical: 'No',
      Purposes: [
        { Purpose: '1.3.6.1.5.5.7.3.2' },
        { Purpose: '1.3.6.1.5.5.7.3.4' },
      ],
    });
  });
});
