/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Convert } from 'pvtsutils';
import { ExtensionRequestAttribute } from './extension_request_attribute';

describe('ExtensionRequestAttribute', () => {
  it('should return correct JSON structure', () => {
    /**
     * Name: Extension Request
     * Contains a Subject Alternative Name extension (OID 2.5.29.17)
     */
    const hexAttribute = '303f06092a864886f70d01090e31323030302e0603551d1104273025a023060a2b060104018237140203a0150c136164647265737340646f6d61696e2e74657374';
    const attribute = new ExtensionRequestAttribute(Convert.FromHex(hexAttribute));

    const json = attribute.toJSON();

    expect(json).toEqual({
      Name: 'Extension Request',
      Extensions: [
        {
          Name: 'Subject Alternative Name',
          Critical: 'No',
          Names: [
            {
              'Other Name': 'address@domain.test',
            },
          ],
        }
      ]
    });
  });
});
