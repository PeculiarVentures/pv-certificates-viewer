/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Convert } from 'pvtsutils';
import { DeltaCRLIndicatorExtension } from './delta_crl_indicator_extension';

describe('DeltaCRLIndicatorExtension', () => {
  it('should return correct JSON structure', () => {
    /**
     * Name: Delta CRL Indicator
     * Critical: Yes
     * Value: 1
     */
    const hexExtension = '300d0603551d1b0101ff0403020101';
    const extension = new DeltaCRLIndicatorExtension(Convert.FromHex(hexExtension));

    const json = extension.toJSON();

    expect(json).toEqual({
      Name: 'Delta CRL Indicator',
      Critical: 'Yes',
      Value: '1',
    });
  });
});
