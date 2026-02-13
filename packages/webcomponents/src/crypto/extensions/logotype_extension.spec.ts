/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Convert } from 'pvtsutils';
import { LogotypeExtension } from './logotype_extension';

describe('LogotypeExtension', () => {
  it('should return correct JSON structure', () => {
    /**
     * Name: Logotype
     * Critical: No
     * Contains subject logo and community logos
     */
    const hexExtension = '308201d006082b0601050507010c048201c2308201bea081e33081e0a06f306d306b3069160a696d6167652f6a7065673031302f300b06096086480165030402010420affc101646cb5625b4997de5893eae3a846f5a02d382d6da8ed4eef87cbd1ded30281626687474703a2f2f7777772e6578616d706c652e6e65742f696d616765732f6c6f676f2e6a7067a06d306b306930671609696d6167652f6769663031302f300b0609608648016503040201042088908181adfb66ae2f66d049a04d8ea0ec4ea86442385b364abf2c8bd2e9e96630271625687474703a2f2f7777772e6578616d706c652e6f72672f6c6f676f2d696d6167652e676966a281d5a081d23081cf306530631609696d6167652f6769663031302f300b060960864801650304020104206a58502e5967f9ddd18afebd0db1fe60a5131bdf0fb2bef0b5734550ba1bbf1930231621687474703a2f2f7777772e736d696d652e6578616d706c652f6c6f676f2e67696630663064160a696d6167652f6a7065673031302f300b06096086480165030402010420bdcb7b75276d8c1b33a42cdeac7972da4ad9f279840a58586ace2f0280ead7a530231621687474703a2f2f7777772e736d696d652e6578616d706c652f6c6f676f2e6a7067';
    const extension = new LogotypeExtension(Convert.FromHex(hexExtension));

    const json = extension.toJSON();

    expect(json).toEqual({
      Name: 'Logotype',
      Critical: 'No',
      'Subject Logo': {
        Images: [
          {
            'Image Type': 'image/gif',
            'Image Hash Algorithm': 'SHA-256',
            'Image Hash': '6a58502e5967f9ddd18afebd0db1fe60a5131bdf0fb2bef0b5734550ba1bbf19',
            'Image URL': 'http://www.smime.example/logo.gif',
          },
          {
            'Image Type': 'image/jpeg',
            'Image Hash Algorithm': 'SHA-256',
            'Image Hash': 'bdcb7b75276d8c1b33a42cdeac7972da4ad9f279840a58586ace2f0280ead7a5',
            'Image URL': 'http://www.smime.example/logo.jpg',
          },
        ],
      },
      'Community Logos': [
        {
          Images: [
            {
              'Image Type': 'image/jpeg',
              'Image Hash Algorithm': 'SHA-256',
              'Image Hash': 'affc101646cb5625b4997de5893eae3a846f5a02d382d6da8ed4eef87cbd1ded',
              'Image URL': 'http://www.example.net/images/logo.jpg',
            },
          ],
        },
        {
          Images: [
            {
              'Image Type': 'image/gif',
              'Image Hash Algorithm': 'SHA-256',
              'Image Hash': '88908181adfb66ae2f66d049a04d8ea0ec4ea86442385b364abf2c8bd2e9e966',
              'Image URL': 'http://www.example.org/logo-image.gif',
            },
          ],
        },
      ],
    });
  });
});
