/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Convert } from 'pvtsutils';
import { BiometricSyntaxExtension } from './biometric_syntax_extension';

describe('BiometricSyntaxExtension', () => {
  it('should return correct JSON structure', () => {
    /**
     * Name: Biometric Syntax
     * Critical: No
     * Biometrics: Array of biometric data objects
     */
    const hexExtension = '3081f006082b060105050701020481e33081e03032020101300b0609608648016503040201042030514605c99246c91d43e0980446411248a66bd2bd1c6c27ca6c3b6b17a024443032020100300b0609608648016503040201042016d21caa94f2d4c52321157cd8070cec3963b673ba264618a4e62ebd0076e62b303a0609608554010202040201300b060960864801650304020104203b8e3d6e84e9af530433e9fe208e4f4dec3897ce6b402e637fc7d5a71eac6075303a0609608554010202040206300b06096086480165030402010420cc53f08e65711f88bf932b6085d5b35bed4cb8c6f76d8a648a1af5475641fbf5';
    const extension = new BiometricSyntaxExtension(Convert.FromHex(hexExtension));

    const json = extension.toJSON();

    expect(json).toEqual({
      Name: 'Biometric Syntax',
      Critical: 'No',
      Biometrics: [
        {
          Type: 1,
          Algorithm: 'SHA-256 (2.16.840.1.101.3.4.2.1)',
          Hash: '30514605c99246c91d43e0980446411248a66bd2bd1c6c27ca6c3b6b17a02444',
        },
        {
          Type: 0,
          Algorithm: 'SHA-256 (2.16.840.1.101.3.4.2.1)',
          Hash: '16d21caa94f2d4c52321157cd8070cec3963b673ba264618a4e62ebd0076e62b',
        },
        {
          OID: '2.16.724.1.2.2.4.2.1',
          Algorithm: 'SHA-256 (2.16.840.1.101.3.4.2.1)',
          Hash: '3b8e3d6e84e9af530433e9fe208e4f4dec3897ce6b402e637fc7d5a71eac6075',
        },
        {
          OID: '2.16.724.1.2.2.4.2.6',
          Algorithm: 'SHA-256 (2.16.840.1.101.3.4.2.1)',
          Hash: 'cc53f08e65711f88bf932b6085d5b35bed4cb8c6f76d8a648a1af5475641fbf5',
        },
      ],
    });
  });
});
