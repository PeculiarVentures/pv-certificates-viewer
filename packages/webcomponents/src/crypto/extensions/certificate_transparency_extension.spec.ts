/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Convert } from 'pvtsutils';
import { CertificateTransparencyExtension } from './certificate_transparency_extension';

describe('CertificateTransparencyExtension', () => {
  it('should return correct JSON structure', () => {
    /**
     * Name: Certificate Transparency
     * Critical: No
     * Signed Certificate Timestamps: Array of SCT objects
     */
    const hexExtension = '3082017e060a2b06010401d6790204020482016e0482016a0168007600bbd9dfbc1f8a71b593942397aa927b473857950aab52e81a909664368e1ed185000001694908669900000403004730450220196464227246b03cc104152352d9cc68477f2d7c25d4bd9c5c83505b8b5923d8022100eb4fe6cdc507616d36772d8be1585cc9a421cd72395187db12fc54da3f7f2eec0077005614069a2fd7c2ecd3f5e1bd44b23ec74676b9bc99115cc0ef949855d689d0dd00000169490867350000040300483046022100a7120fdd79560b72c3a945b812642593156888b53bf951ce716a1e3c6fc04aa402210097f2ff7cfc4d217ec4d3a802952df310c896cc0eac6aec3e584b9dcb3c465d0a0075008775bfe7597cf88c43995fbdf36eff568d475636ff4ab560c1b4eaff5ea0830f00000169490868ff000004030046304402207ce5e615aeab86c064ea5c621dec6b5c2b8dd73aa7ca9656890ce76a949bb1830220587985024353899a71ba2c8018516d2efe965824de565d03b74aa284978df7ff';
    const extension = new CertificateTransparencyExtension(Convert.FromHex(hexExtension));

    const json = extension.toJSON();

    expect(json).toEqual({
      Name: 'Certificate Transparency',
      Critical: 'No',
      'Signed Certificate Timestamps': [
        {
          Version: 1,
          'Log Key ID': 'bbd9dfbc1f8a71b593942397aa927b473857950aab52e81a909664368e1ed185',
          'Log Operator': 'Google \u201cSkydiver\u201d',
          Timestamp: 'Mon, 04 Mar 2019 14:08:01 GMT',
          'Signature Algorithm': 'SHA256 ECDSA',
          Signature: 'MEUCIBlkZCJyRrA8wQQVI1LZzGhHfy18JdS9nFyDUFuLWSPYAiEA60/mzcUHYW02dy2L4VhcyaQhzXI5UYfbEvxU2j9/Luw=',
          Extensions: undefined,
        },
        {
          Version: 1,
          'Log Key ID': '5614069a2fd7c2ecd3f5e1bd44b23ec74676b9bc99115cc0ef949855d689d0dd',
          'Log Operator': 'DigiCert Server',
          Timestamp: 'Mon, 04 Mar 2019 14:08:01 GMT',
          'Signature Algorithm': 'SHA256 ECDSA',
          Signature: 'MEYCIQCnEg/deVYLcsOpRbgSZCWTFWiItTv5Uc5xah48b8BKpAIhAJfy/3z8TSF+xNOoApUt8xDIlswOrGrsPlhLncs8Rl0K',
          Extensions: undefined,
        },
        {
          Version: 1,
          'Log Key ID': '8775bfe7597cf88c43995fbdf36eff568d475636ff4ab560c1b4eaff5ea0830f',
          'Log Operator': 'DigiCert Server 2',
          Timestamp: 'Mon, 04 Mar 2019 14:08:01 GMT',
          'Signature Algorithm': 'SHA256 ECDSA',
          Signature: 'MEQCIHzl5hWuq4bAZOpcYh3sa1wrjdc6p8qWVokM52qUm7GDAiBYeYUCQ1OJmnG6LIAYUW0u/pZYJN5WXQO3SqKEl433/w==',
          Extensions: undefined,
        },
      ],
    });
  });
});
