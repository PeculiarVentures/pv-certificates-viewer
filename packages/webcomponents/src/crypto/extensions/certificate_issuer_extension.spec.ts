/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Convert } from 'pvtsutils';
import { CertificateIssuerExtension } from './certificate_issuer_extension';

describe('CertificateIssuerExtension', () => {
  it('should return correct JSON structure', () => {
    /**
     * Name: Certificate Issuer
     * Critical: No
     * Contains a GeneralName with directoryName (CN=t,OU=x,O=y)
     */
    const hexExtension = '302d0603551d1d04263024a4223020311e300806035504030c01743008060355040b0c01783008060355040a0c0179';
    const extension = new CertificateIssuerExtension(Convert.FromHex(hexExtension));

    const json = extension.toJSON();

    expect(json).toEqual({
      Name: 'Certificate Issuer',
      Critical: 'No',
      Issuers: [
        {
          'Directory Name': [
            {
              '2.5.4.3': 't',
            },
            {
              '2.5.4.11': 'x',
            },
            {
              '2.5.4.10': 'y',
            },
          ],
        },
      ],
    });
  });
});
