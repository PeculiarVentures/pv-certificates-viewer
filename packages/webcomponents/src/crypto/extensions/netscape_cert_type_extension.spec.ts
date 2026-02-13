/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Convert } from 'pvtsutils';
import { NetscapeCertTypeExtension } from './netscape_cert_type_extension';

describe('NetscapeCertTypeExtension', () => {
  it('should return correct JSON structure', () => {
    /**
     * Name: Netscape Certificate Type
     * Critical: No
     * Type: SSL Client, SSL Server, S/MIME, Object Signing
     */
    const hexExtension = '301106096086480186f8420101040403020007';
    const extension = new NetscapeCertTypeExtension(Convert.FromHex(hexExtension));

    const json = extension.toJSON();

    expect(json).toEqual({
      Name: 'Netscape Certificate Type',
      Critical: 'No',
      Type: 'objectSigningCa, sMimeCa, sslCa',
    });
  });
});
