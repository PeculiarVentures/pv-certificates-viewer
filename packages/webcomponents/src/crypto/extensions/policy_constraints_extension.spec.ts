/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Convert } from 'pvtsutils';
import { PolicyConstraintsExtension } from './policy_constraints_extension';

describe('PolicyConstraintsExtension', () => {
  it('should return correct JSON structure', () => {
    /**
     * Name: Policy Constraints
     * Critical: Yes
     * Require Explicit Policy: Optional integer value
     * Inhibit Policy Mapping: Optional integer value
     */
    const hexExtension = '30120603551d240101ff04083006800100810100';
    const extension = new PolicyConstraintsExtension(Convert.FromHex(hexExtension));

    const json = extension.toJSON();

    expect(json).toEqual({
      Name: 'Policy Constraints',
      Critical: 'Yes',
      'Require Explicit Policy': '0',
      'Inhibit Policy Mapping': '0',
    });
  });
});
