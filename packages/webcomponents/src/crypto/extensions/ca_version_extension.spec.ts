/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Convert } from 'pvtsutils';
import { CaVersionExtension } from './ca_version_extension';

describe('CaVersionExtension', () => {
  it('should return correct JSON structure', () => {
    /**
     * Name: CA Version
     * Critical: No
     * Certificate Index: 0
     * Key Index: 0
     */
    const hexExtension = '301006092b06010401823715010403020100';
    const extension = new CaVersionExtension(Convert.FromHex(hexExtension));

    const json = extension.toJSON();

    expect(json).toEqual({
      Name: 'CA Version',
      Critical: 'No',
      'Certificate Index': 0,
      'Key Index': 0,
    });
  });
});
