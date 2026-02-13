/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Convert } from 'pvtsutils';
import { EnrollCertTypeChoiceExtension } from './enroll_cert_type_choice_extension';

describe('EnrollCertTypeChoiceExtension', () => {
  it('should return correct JSON structure', () => {
    /**
     * Name: Enroll Cert Type
     * Critical: No
     * Value: String representation of the cert type
     */
    const hexExtension = '301906092b0601040182371502040c1e0a00530075006200430041';
    const extension = new EnrollCertTypeChoiceExtension(Convert.FromHex(hexExtension));

    const json = extension.toJSON();

    expect(json).toEqual({
      Name: 'Enroll Cert Type',
      Critical: 'No',
      Value: 'SubCA',
    });
  });
});
