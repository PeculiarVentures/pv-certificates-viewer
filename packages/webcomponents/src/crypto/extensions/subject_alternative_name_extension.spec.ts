/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Convert } from 'pvtsutils';
import { SubjectAlternativeNameExtension } from './subject_alternative_name_extension';

describe('SubjectAlternativeNameExtension', () => {
  it('should return correct JSON structure', () => {
    /**
     * Name: Subject Alternative Name
     * Critical: No
     * Names: Array of GeneralName objects
     */
    const hexExtension = '30520603551d11044b304981167374657068616e2e776f6c6640676c6569662e6f7267a42f302d3113301106092b06010401e67900010c04576f6c663116301406092b06010401e67900020c075374657068616e';
    const extension = new SubjectAlternativeNameExtension(Convert.FromHex(hexExtension));

    const json = extension.toJSON();

    expect(json).toEqual({
      Name: 'Subject Alternative Name',
      Critical: 'No',
      Names: [
        {
          'RFC 822 Name': 'stephan.wolf@gleif.org',
        },
        {
          'Directory Name': [
            {
              '1.3.6.1.4.1.13177.0.1': 'Wolf',
            },
            {
              '1.3.6.1.4.1.13177.0.2': 'Stephan',
            },
          ]
        },
      ],
    });
  });
});
