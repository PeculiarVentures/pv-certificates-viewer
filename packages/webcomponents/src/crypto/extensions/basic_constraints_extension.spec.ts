/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Convert } from 'pvtsutils';
import { BasicConstraintsExtension } from './basic_constraints_extension';

describe('BasicConstraintsExtension', () => {
  it('should return correct JSON structure', () => {
    /**
     * Name: Basic Constraints
     * Critical: Yes
     * Certificate Authority: Yes
     * Path Length Constraint: 0
     */
    const hexExtension = '30120603551d130101ff040830060101ff020100';
    const extension = new BasicConstraintsExtension(Convert.FromHex(hexExtension));

    const json = extension.toJSON();

    expect(json).toEqual({
      Name: 'Basic Constraints',
      Critical: 'Yes',
      'Certificate Authority': 'Yes',
      'Path Length Constraint': 0,
    });
  });
});
