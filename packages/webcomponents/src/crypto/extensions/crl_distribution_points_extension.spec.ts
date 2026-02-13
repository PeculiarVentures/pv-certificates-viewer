/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Convert } from 'pvtsutils';
import { CRLDistributionPointsExtension } from './crl_distribution_points_extension';

describe('CRLDistributionPointsExtension', () => {
  it('should return correct JSON structure', () => {
    /**
     * Name: CRL Distribution Points
     * Critical: No
     * Distribution Points: Array of distribution point objects
     */
    const hexExtension = '30818e0603551d1f048186308183308180a07ea07ca47a3078310b300906035504061302555331233021060355040a131a41646f62652053797374656d7320496e636f72706f7261746564311d301b060355040b131441646f6265205472757374205365727669636573311630140603550403130d41646f626520526f6f74204341310d300b0603550403130443524c31';
    const extension = new CRLDistributionPointsExtension(Convert.FromHex(hexExtension));

    const json = extension.toJSON();

    expect(json).toEqual({
      Name: 'CRL Distribution Points',
      Critical: 'No',
      'Distribution Points': [
        {
          'Distribution Point': [
            {
              'Directory Name': [
                { '2.5.4.6': 'US' },
                { '2.5.4.10': 'Adobe Systems Incorporated' },
                { '2.5.4.11': 'Adobe Trust Services' },
                { '2.5.4.3': 'Adobe Root CA' },
                { '2.5.4.3': 'CRL1' },
              ],
            },
          ],
        },
      ],
    });
  });
});
