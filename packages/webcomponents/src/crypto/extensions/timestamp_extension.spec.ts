/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Convert } from 'pvtsutils';
import { TimestampExtension } from './timestamp_extension';

describe('TimestampExtension', () => {
  it('should return correct JSON structure', () => {
    /**
     * Name: Timestamp
     * Critical: No
     * Version: 1
     * Location: GeneralName (URI)
     * Requires Auth: No
     */
    const hexExtension = '3034060a2a864886f72f0101090104263024020101861f687474703a2f2f74732e71756f7661646973676c6f62616c2e636f6d2f6265';
    const extension = new TimestampExtension(Convert.FromHex(hexExtension));

    const json = extension.toJSON();

    expect(json).toEqual({
      Name: 'Timestamp',
      Critical: 'No',
      Version: 1,
      URI: 'http://ts.quovadisglobal.com/be',
      'Requires Auth': 'No',
    });
  });
});
