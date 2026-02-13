/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Convert } from 'pvtsutils';
import { IssuerAlternativeNameExtension } from './issuer_alternative_name_extension';

describe('IssuerAlternativeNameExtension', () => {
  it('should return correct JSON structure', () => {
    /**
     * Name: Issuer Alternative Name
     * Critical: No
     * Names: Array of GeneralName objects (DNS, RFC 822, IP Address)
     */
    const hexExtension = '30370603551d120430302e82126973737565722e6578616d706c652e636f6d8112697373756572406578616d706c652e636f6d8704c0a80101';
    const extension = new IssuerAlternativeNameExtension(Convert.FromHex(hexExtension));

    const json = extension.toJSON();

    expect(json).toEqual({
      Name: 'Issuer Alternative Name',
      Critical: 'No',
      Names: [
        { 'DNS Name': 'issuer.example.com' },
        { 'RFC 822 Name': 'issuer@example.com' },
        { 'IP Address': '192.168.1.1' },
      ],
    });
  });
});
