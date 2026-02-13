/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Convert } from 'pvtsutils';
import { CRLNumberExtension } from './crl_number_extension';

describe('CRLNumberExtension', () => {
  it('should return correct JSON structure', () => {
    /**
     * Name: CRL Number
     * Critical: No
     * Value: 3
     */
    const hexExtension = '300a0603551d140403020103';
    const extension = new CRLNumberExtension(Convert.FromHex(hexExtension));

    const json = extension.toJSON();

    expect(json).toEqual({
      Name: 'CRL Number',
      Critical: 'No',
      Value: '3',
    });
  });
});
