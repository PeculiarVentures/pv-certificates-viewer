/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Convert } from 'pvtsutils';
import { DomainNameLegalRepresentativeAttribute } from './domain_name_legal_representative_attribute';

describe('DomainNameLegalRepresentativeAttribute', () => {
  it('should return correct JSON structure', () => {
    /**
     * Name: Domain Name Legal Representative
     * Contains Name structure with givenName=Olivier, surname=Barette, O=Nowina Solutions, C=BE, serialNumber=PASBE-AB123456
     */
    const hexAttribute = '307006050400ca1802316730653110300e060355042a0c074f6c69766965723110300e06035504040c074261726574746531193017060355040a0c104e6f77696e6120536f6c7574696f6e73310b3009060355040613024245311730150603550405130e50415342452d4142313233343536';
    const attribute = new DomainNameLegalRepresentativeAttribute(Convert.FromHex(hexAttribute));

    const json = attribute.toJSON();

    expect(json).toMatchSnapshot();
  });
});
