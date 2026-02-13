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

    expect(json).toEqual({
      Name: 'Policy Mappings',
      Critical: 'No',
      Policies: [
        {
          'Issuer Domain': 'FBCA Basic Policy (2.16.840.1.101.3.2.1.3.2)',
          'Subject Domain': 'USPTO Basic 2003 (2.16.840.1.101.3.2.1.2.7)',
        },
        {
          'Issuer Domain': 'FBCA Medium Policy (2.16.840.1.101.3.2.1.3.3)',
          'Subject Domain': 'USPTO Medium 2003 (2.16.840.1.101.3.2.1.2.8)',
        },
        {
          'Issuer Domain': 'FBCA Medium Hardware Policy (2.16.840.1.101.3.2.1.3.12)',
          'Subject Domain': 'USPTO Medium Hardware (2.16.840.1.101.3.2.1.2.9)',
        },
      ],
    });
  });
});
