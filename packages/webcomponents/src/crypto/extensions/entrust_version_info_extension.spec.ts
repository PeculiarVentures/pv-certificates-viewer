/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Convert } from 'pvtsutils';
import { EntrustVersionInfoExtension } from './entrust_version_info_extension';

describe('EntrustVersionInfoExtension', () => {
  it('should return correct JSON structure', () => {
    /**
     * Name: Entrust Version Info
     * Critical: No
     * Version: V6.0:4.0
     * Info Flags: Array of flag strings
     */
    const hexExtension = '301d06092a864886f67d0741000410300e1b0856362e303a342e3003020490';
    const extension = new EntrustVersionInfoExtension(Convert.FromHex(hexExtension));

    const json = extension.toJSON();

    expect(json).toEqual({
      Name: 'Entrust Version Info',
      Critical: 'No',
      Version: 'V6.0:4.0',
      'Info Flags': 'keyUpdateAllowed',
    });
  });
});
