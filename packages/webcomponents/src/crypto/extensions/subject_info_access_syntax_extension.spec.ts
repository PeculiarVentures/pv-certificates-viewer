/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Convert } from 'pvtsutils';
import { SubjectInfoAccessSyntaxExtension } from './subject_info_access_syntax_extension';

describe('SubjectInfoAccessSyntaxExtension', () => {
  it('should return correct JSON structure', () => {
    /**
     * Name: Subject Info Access
     * Critical: No
     * Descriptions: Array of access descriptions with Method and Location
     */
    const hexExtension = '305506082b0601050507010b04493047304506082b060105050730058639687474703a2f2f69706b692e757370746f2e676f762f49504b492f43657274732f434163657274734973737565644279555350544f2e703763';
    const extension = new SubjectInfoAccessSyntaxExtension(Convert.FromHex(hexExtension));

    const json = extension.toJSON();

    expect(json).toEqual({
      Name: 'Subject Info Access',
      Critical: 'No',
      Descriptions: [
        {
          Method: '1.3.6.1.5.5.7.48.5',
          URI: 'http://ipki.uspto.gov/IPKI/Certs/CAcertsIssuedByUSPTO.p7c',
        },
      ],
    });
  });
});
