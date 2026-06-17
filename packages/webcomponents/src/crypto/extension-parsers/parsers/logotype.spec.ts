/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { id_pe_logotype } from '@peculiar/asn1-x509-logotype';
import { makeExtRaw } from '../../../tests/test_utils';
import { LogotypeParser } from './logotype';

describe('LogotypeParser', () => {
  const parser = new LogotypeParser();

  it('registers correct OID', () => {
    expect(parser.oids).toContain(id_pe_logotype);
  });

  it('parses subject logo with direct image and URI', () => {
    // LogotypeExtn { subjectLogo: LogotypeInfo { direct: { image: [{ imageDetails: {
    //   mediaType: 'image/png',
    //   logotypeHash: [{ hashAlg: SHA-256, hashValue: 32 x 0xab }],
    //   logotypeURI: ['https://example.com/logo.png']
    // }}]}}}
    expect(parser.parse(makeExtRaw(
      id_pe_logotype,
      '3068a266a06430623060305e1609696d6167652f706e673031302f300b06096086480165030402010420abababababababababababababababababababababababababababababababab301e161c68747470733a2f2f6578616d706c652e636f6d2f6c6f676f2e706e67',
    ))).toEqual({
      oid: id_pe_logotype,
      critical: false,
      children: [
        {
          title: 'Subject Logo',
          children: [
            {
              title: 'Image',
              children: [
                {
                  title: 'Media Type', value: 'image/png',
                },
                {
                  title: 'URI', value: 'https://example.com/logo.png',
                },
              ],
            },
          ],
        },
      ],
    });
  });
});
