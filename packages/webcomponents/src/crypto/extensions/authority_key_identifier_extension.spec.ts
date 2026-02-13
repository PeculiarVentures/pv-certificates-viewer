/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Convert } from 'pvtsutils';
import { AuthorityKeyIdentifierExtension } from './authority_key_identifier_extension';

describe('AuthorityKeyIdentifierExtension', () => {
  it('should return correct JSON structure', () => {
    /**
     * Name: Authority Key Identifier
     * Critical: No
     * Key ID: 6ba5bdcf9dfa235978126417ae1e72d89a804ae8
     */
    const hexExtension = '301f0603551d230418301680146ba5bdcf9dfa235978126417ae1e72d89a804ae8';
    const extension = new AuthorityKeyIdentifierExtension(Convert.FromHex(hexExtension));

    const json = extension.toJSON();

    expect(json).toEqual({
      Name: 'Authority Key Identifier',
      Critical: 'No',
      'Key ID': '6ba5bdcf9dfa235978126417ae1e72d89a804ae8',
    });
  });
});
