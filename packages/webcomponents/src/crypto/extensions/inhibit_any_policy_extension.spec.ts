/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Convert } from 'pvtsutils';
import { InhibitAnyPolicyExtension } from './inhibit_any_policy_extension';

describe('InhibitAnyPolicyExtension', () => {
  it('should return correct JSON structure', () => {
    /**
     * Name: Inhibit Any Policy
     * Critical: Yes
     * Skip Certs: Integer value
     */
    const hexExtension = '300d0603551d360101ff0403020100';
    const extension = new InhibitAnyPolicyExtension(Convert.FromHex(hexExtension));

    const json = extension.toJSON();

    expect(json).toEqual({
      Name: 'Inhibit Any Policy',
      Critical: 'Yes',
      'Skip Certs': '0',
    });
  });
});
