/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Convert } from 'pvtsutils';
import { QCStatementsExtension } from './qc_statements_extension';

describe('QCStatementsExtension', () => {
  it('should return correct JSON structure', () => {
    /**
     * Name: QC Statements
     * Critical: No
     * Statements: Array of statement objects
     */
    const hexExtension = '302306082b06010505070103041730153008060604008e4601013009060704008e46010603';
    const extension = new QCStatementsExtension(Convert.FromHex(hexExtension));

    const json = extension.toJSON();

    expect(json).toEqual({
      Name: 'QC Statements',
      Critical: 'No',
      Statements: [
        { 'Statement ID': '0.4.0.1862.1.1' },
        { 'Statement ID': '0.4.0.1862.1.6.3' },
      ],
    });
  });

  it('should return correct JSON structure with multiple statements', () => {
    /**
     * Name: QC Statements
     * Critical: No
     * Statements: Array of statement objects with multiple QC types
     */
    const hexExtension = '307d06082b060105050701030471306f3008060604008e460101300b060604008e46010302010f3013060604008e4601063009060704008e460106013041060604008e46010530373035162f68747470733a2f2f7777772e6669726d6170726f666573696f6e616c2e636f6d2f6370732f7064735f656e2e7064661302656e';
    const extension = new QCStatementsExtension(Convert.FromHex(hexExtension));

    const json = extension.toJSON();

    expect(json).toEqual({
      Name: 'QC Statements',
      Critical: 'No',
      Statements: [
        { 'Statement ID': '0.4.0.1862.1.1' },
        {
          'Statement ID': '0.4.0.1862.1.3',
          'Retention Period': '15 years',
        },
        {
          'Statement ID': '0.4.0.1862.1.6',
          'QC Types': '0.4.0.1862.1.6.1',
        },
        {
          'Statement ID': '0.4.0.1862.1.5',
          'PDS Locations': [
            {
              URL: 'https://www.firmaprofesional.com/cps/pds_en.pdf',
              Language: 'en',
            },
          ],
        },
      ],
    });
  });
});
