/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Convert } from 'pvtsutils';
import { SubjectKeyIdentifierExtension } from './subject_key_identifier_extension';

describe('SubjectKeyIdentifierExtension', () => {
  it('should return correct JSON structure', () => {
    /**
     * Name: Subject Key Identifier
     * Critical: No
     * Key ID: a84a6a63047dddbae6d139b7a64565eff3a8eca1
     */
    const hexExtension = '301d0603551d0e04160414a84a6a63047dddbae6d139b7a64565eff3a8eca1';
    const extension = new SubjectKeyIdentifierExtension(Convert.FromHex(hexExtension));

    const json = extension.toJSON();

    expect(json).toEqual({
      Name: 'Subject Key Identifier',
      Critical: 'No',
      'Key ID': 'a84a6a63047dddbae6d139b7a64565eff3a8eca1',
    });
  });
});
