/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Convert } from 'pvtsutils';
import { LeiRoleExtension } from './lei_role_extension';

describe('LeiRoleExtension', () => {
  it('should return correct JSON structure', () => {
    /**
     * Name: LEI Role
     * Critical: No
     * Role: CEO
     */
    const hexExtension = '301206092b0601040183982a0204050c0343454f';
    const extension = new LeiRoleExtension(Convert.FromHex(hexExtension));

    const json = extension.toJSON();

    expect(json).toEqual({
      Name: 'LEI Role',
      Critical: 'No',
      Role: 'CEO',
    });
  });
});
