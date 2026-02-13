/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Convert } from 'pvtsutils';
import { SubjectDirectoryAttributesExtension } from './subject_directory_attributes_extension';

describe('SubjectDirectoryAttributesExtension', () => {
  it('should return correct JSON structure', () => {
    /**
     * Name: Subject Directory Attributes
     * Critical: No
     * Attributes: Array of attribute objects with Type and Value
     */
    const hexExtension = '30640603551d09045d305b301006082b06010505070904310413024445300f06082b060105050709033103130146301d06082b060105050709013111180f31393731313031343132303030305a301706082b06010505070902310b0c094461726d7374616474';
    const extension = new SubjectDirectoryAttributesExtension(Convert.FromHex(hexExtension));

    const json = extension.toJSON();

    expect(json).toEqual({
      Name: 'Subject Directory Attributes',
      Critical: 'No',
      Attributes: [
        {
          Type: '1.3.6.1.5.5.7.9.4',
          Value: '\u0013\u0002DE',
        },
        {
          Type: '1.3.6.1.5.5.7.9.3',
          Value: '\u0013\u0001F',
        },
        {
          Type: '1.3.6.1.5.5.7.9.1',
          Value: '\u0018\u000f19711014120000Z',
        },
        {
          Type: '1.3.6.1.5.5.7.9.2',
          Value: '\f\tDarmstadt',
        },
      ],
    });
  });
});
