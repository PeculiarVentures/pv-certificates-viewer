/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Convert } from 'pvtsutils';
import { PolicyMappingsExtension } from './policy_mappings_extension';

describe('PolicyMappingsExtension', () => {
  it('should return correct JSON structure', () => {
    /**
     * Name: Policy Mappings
     * Critical: No
     * Policies: Array of policy objects with Issuer Domain and Subject Domain
     */
    const hexExtension = '30570603551d210450304e3018060a60864801650302010302060a608648016503020102073018060a60864801650302010303060a608648016503020102083018060a6086480165030201030c060a60864801650302010209';
    const extension = new PolicyMappingsExtension(Convert.FromHex(hexExtension));

    const json = extension.toJSON();

    expect(json).toMatchSnapshot();
  });
});
