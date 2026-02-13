/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Convert } from 'pvtsutils';
import { NameConstraintsExtension } from './name_constraints_extension';

describe('NameConstraintsExtension', () => {
  it('should return correct JSON structure', () => {
    /**
     * Name: Name Constraints
     * Critical: Yes
     * Permitted Subtrees: Array of subtree objects with GeneralName data
     */
    const hexExtension = '30400603551d1e0101ff04363034a0323030a42e302c31133011060a0992268993f22c6401191603676f7631153013060a0992268993f22c6401191605757370746f';
    const extension = new NameConstraintsExtension(Convert.FromHex(hexExtension));

    const json = extension.toJSON();

    expect(json).toEqual({
      Name: 'Name Constraints',
      Critical: 'Yes',
      'Permitted Subtrees': [
        {
          'Directory Name': [
            {
              '0.9.2342.19200300.100.1.25': 'gov',
            },
            {
              '0.9.2342.19200300.100.1.25': 'uspto',
            },
          ],
          Minimum: '0',
        },
      ],
    });
  });
});
