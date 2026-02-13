/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Convert } from 'pvtsutils';
import { LeiChoiceExtension } from './lei_choice_extension';

describe('LeiChoiceExtension', () => {
  it('should return correct JSON structure', () => {
    /**
     * Name: Legal Entity Identifier
     * Critical: No
     * Identifier: 506700GE1G729325QX363
     */
    const hexExtension = '302306092b0601040183982a0104160c143530363730304745314732393332355158333633';
    const extension = new LeiChoiceExtension(Convert.FromHex(hexExtension));

    const json = extension.toJSON();

    expect(json).toEqual({
      Name: 'Legal Entity Identifier',
      Critical: 'No',
      Identifier: '506700GE1G29325QX363',
    });
  });
});
