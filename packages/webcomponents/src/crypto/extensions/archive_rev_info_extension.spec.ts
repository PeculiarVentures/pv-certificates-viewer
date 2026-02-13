/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Convert } from 'pvtsutils';
import { ArchiveRevInfoExtension } from './archive_rev_info_extension';

describe('ArchiveRevInfoExtension', () => {
  it('should return correct JSON structure', () => {
    /**
     * Name: Archive Rev Info
     * Critical: No
     * Version: 1
     */
    const hexExtension = '3013060a2a864886f72f0101090204053003020101';
    const extension = new ArchiveRevInfoExtension(Convert.FromHex(hexExtension));

    const json = extension.toJSON();

    expect(json).toEqual({
      Name: 'Archive Rev Info',
      Critical: 'No',
      Version: 1,
    });
  });
});
