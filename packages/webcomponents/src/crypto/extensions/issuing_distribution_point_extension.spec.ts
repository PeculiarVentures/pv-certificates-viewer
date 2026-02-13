/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Convert } from 'pvtsutils';
import { IssuingDistributionPointExtension } from './issuing_distribution_point_extension';

describe('IssuingDistributionPointExtension', () => {
  it('should return correct JSON structure', () => {
    /**
     * Name: Issuing Distribution Point
     * Critical: Yes
     * Distribution Point: URI with CRL location
     * Only Contains User Certs: Yes
     */
    const hexExtension = '30400603551d1c0101ff04363034a02fa02d862b687474703a2f2f63726c732e706b692e676f6f672f6774733170352f37554375585a754c5549672e63726c8101ff';
    const extension = new IssuingDistributionPointExtension(Convert.FromHex(hexExtension));

    const json = extension.toJSON();

    expect(json).toEqual({
      Name: 'Issuing Distribution Point',
      Critical: 'Yes',
      'Distribution Point': [
        {
          URI: 'http://crls.pki.goog/gts1p5/7UCuXZuLUIg.crl',
        },
      ],
      'Only Contains User Certs': 'Yes',
    });
  });
});
