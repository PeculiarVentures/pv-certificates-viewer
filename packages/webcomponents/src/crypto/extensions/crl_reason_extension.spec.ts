/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Convert } from 'pvtsutils';
import { CRLReasonExtension } from './crl_reason_extension';

describe('CRLReasonExtension', () => {
  it('should return correct JSON structure', () => {
    /**
     * Name: CRL Reason
     * Critical: No
     * Reason: cessationOfOperation
     */
    const hexExtension = '300a0603551d1504030a0105';
    const extension = new CRLReasonExtension(Convert.FromHex(hexExtension));

    const json = extension.toJSON();

    expect(json).toEqual({
      Name: 'CRL Reason',
      Critical: 'No',
      Reason: 'cessationOfOperation',
    });
  });
});
