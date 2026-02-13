/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Convert } from 'pvtsutils';
import { InvalidityDateExtension } from './invalidity_date_extension';

describe('InvalidityDateExtension', () => {
  it('should return correct JSON structure', () => {
    /**
     * Name: Invalidity Date
     * Critical: No
     * Date: 2023-01-15T10:30:00.000Z
     */
    const hexExtension = '30180603551d180411180f32303233303131353130333030305a';
    const extension = new InvalidityDateExtension(Convert.FromHex(hexExtension));

    const json = extension.toJSON();

    expect(json).toEqual({
      Name: 'Invalidity Date',
      Critical: 'No',
      Date: '2023-01-15T10:30:00.000Z',
    });
  });
});
