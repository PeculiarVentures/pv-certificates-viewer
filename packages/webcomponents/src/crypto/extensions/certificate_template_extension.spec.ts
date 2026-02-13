/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Convert } from 'pvtsutils';
import { CertificateTemplateExtension } from './certificate_template_extension';

describe('CertificateTemplateExtension', () => {
  it('should return correct JSON structure', () => {
    /**
     * Name: Certificate Template
     * Critical: No
     * Template ID: 1.3.6.1.4.1.311.21.8.829cb51c.87929405.85c98314.82b5af79.8497de33.81.106.1.27
     * Template Major Version: 105
     * Template Minor Version: 0
     */
    const hexExtension = '303806092b0601040182371507042b302906212b0601040182371508829cb51c8792940585c9831482b5af798497de338106011b020169020100';
    const extension = new CertificateTemplateExtension(Convert.FromHex(hexExtension));

    const json = extension.toJSON();

    expect(json).toEqual({
      Name: 'Certificate Template',
      Critical: 'No',
      'Template ID': '1.3.6.1.4.1.311.21.8.4659868.14977541.11682196.5068793.8777523.134.1.27',
      'Template Major Version': 105,
      'Template Minor Version': 0,
    });
  });
});
