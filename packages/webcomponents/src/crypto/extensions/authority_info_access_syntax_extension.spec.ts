/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Convert } from 'pvtsutils';
import { AuthorityInfoAccessSyntaxExtension } from './authority_info_access_syntax_extension';

describe('AuthorityInfoAccessSyntaxExtension', () => {
  it('should return correct JSON structure', () => {
    /**
     * Name: Authority Info Access
     * Critical: No
     * Descriptions: Array of description objects with Method and Location
     */
    const hexExtension = '307a06082b06010505070101046e306c303c06082b060105050730028630687474703a2f2f63726c2e6669726d6170726f666573696f6e616c2e636f6d2f6375616c6966696361646f732e637274302c06082b060105050730018620687474703a2f2f6f6373702e6669726d6170726f666573696f6e616c2e636f6d';
    const extension = new AuthorityInfoAccessSyntaxExtension(Convert.FromHex(hexExtension));

    const json = extension.toJSON();

    expect(json).toEqual({
      Name: 'Authority Info Access',
      Critical: 'No',
      Descriptions: [
        {
          Method: '1.3.6.1.5.5.7.48.2',
          URI: 'http://crl.firmaprofesional.com/cualificados.crt',
        },
        {
          Method: '1.3.6.1.5.5.7.48.1',
          URI: 'http://ocsp.firmaprofesional.com',
        },
      ],
    });
  });
});
