/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Convert } from 'pvtsutils';
import { CabforganizationIdentifierExtension } from './cabforganization_identifier_extension';

describe('CabforganizationIdentifierExtension', () => {
  it('should return correct JSON structure', () => {
    /**
     * Name: CABF Organization Identifier
     * Critical: No
     * Registration Scheme Identifier: String
     * Registration Country: String
     * Registration State Or Province: Optional string
     * Registration Reference: String
     */
    const hexExtension = '3022060567810c03010419301713034e545213025553800243410c083237333830383334';
    const extension = new CabforganizationIdentifierExtension(Convert.FromHex(hexExtension));

    const json = extension.toJSON();

    expect(json).toEqual({
      Name: 'CABF Organization Identifier',
      Critical: 'No',
      'Registration Scheme Identifier': 'NTR',
      'Registration Country': 'US',
      'Registration State Or Province': 'CA',
      'Registration Reference': '27380834',
    });
  });
});
