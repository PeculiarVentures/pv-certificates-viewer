/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Convert } from 'pvtsutils';
import { TNAuthorizationListExtension } from './tn_authorization_list_extension';

describe('TNAuthorizationListExtension', () => {
  it('should return correct JSON structure', () => {
    /**
     * Name: TN Authorization List
     * Critical: No
     * Entries: Array of entry objects with SPC, Range (optional), One (optional)
     */
    const hexExtension = '301606082b0601050507011a040a3008a00616043730394a';
    const extension = new TNAuthorizationListExtension(Convert.FromHex(hexExtension));

    const json = extension.toJSON();

    expect(json).toEqual({
      Name: 'TN Authorization List',
      Critical: 'No',
      Entries: [
        {
          SPC: '709J',
        },
      ],
    });
  });
});
