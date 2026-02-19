/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Convert } from 'pvtsutils';
import { TypeRelationshipAttribute } from './type_relationship_attribute';

describe('TypeRelationshipAttribute', () => {
  it('should return correct JSON structure', () => {
    /**
     * Name: Type Relationship
     * DNBvsDNO: Yes, DNBvsDNT: Yes, DNOvsDNT: Yes
     */
    const hexAttribute = '301d06050400ca180531143012a00403020780a10403020780a20403020780';
    const attribute = new TypeRelationshipAttribute(Convert.FromHex(hexAttribute));

    const json = attribute.toJSON();

    expect(json).toMatchSnapshot();
  });
});
