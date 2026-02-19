/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Convert } from 'pvtsutils';
import { UnstructuredNameAttribute } from './unstructured_name_attribute';

describe('UnstructuredNameAttribute', () => {
  it('should return correct JSON structure', () => {
    /**
     * Name: Unstructured Name
     * Value: test name
     */
    const hexAttribute = '301806092a864886f70d010902310b0c0974657374206e616d65';
    const attribute = new UnstructuredNameAttribute(Convert.FromHex(hexAttribute));

    const json = attribute.toJSON();

    expect(json).toMatchSnapshot();
  });
});
