/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Convert } from 'pvtsutils';
import { DomainNameTechnicalOperatorAttribute } from './domain_name_technical_operator_attribute';

describe('DomainNameTechnicalOperatorAttribute', () => {
  it('should return correct JSON structure', () => {
    /**
     * Name: Domain Name Technical Operator
     * Contains Name structure with CN=Nowina, O=Nowina Solutions, C=LU, etc.
     */
    const hexAttribute = '3081fd06050400ca18043181f33081f0310f300d06035504030c064e6f77696e6131193017060355040a0c104e6f77696e6120536f6c7574696f6e73310b3009060355040613024c55310f300d06035504070c064b65686c656e310d300b06035504110c0438323837311d301b06035504090c145a6f6e6520696e647573747269656c6c6520313531193017060355041413102b3335322d3636312d3233312d393134311d301b06092a864886f70d010901160e696e666f406e6f77696e612e6c753117301506035504610c0e5641544c552d32363835303638323123302106035504610c1a4c454958472d3232323130303251514a364b3859515951443038';
    const attribute = new DomainNameTechnicalOperatorAttribute(Convert.FromHex(hexAttribute));

    const json = attribute.toJSON();

    expect(json).toEqual({
      Name: 'Domain Name Technical Operator',
      'Name Parts': [
        { '2.5.4.3': 'Nowina' },
        { '2.5.4.10': 'Nowina Solutions' },
        { '2.5.4.6': 'LU' },
        { '2.5.4.7': 'Kehlen' },
        { '2.5.4.17': '8287' },
        { '2.5.4.9': 'Zone industrielle 15' },
        { '2.5.4.20': '+352-661-231-914' },
        { '1.2.840.113549.1.9.1': 'info@nowina.lu' },
        { '2.5.4.97': 'VATLU-26850682' },
        { '2.5.4.97': 'LEIXG-2221002QQJ6K8YQYQD08' },
      ],
    });
  });
});
