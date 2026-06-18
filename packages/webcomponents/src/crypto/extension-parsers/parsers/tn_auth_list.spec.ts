/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { id_pe_TNAuthList } from '@peculiar/asn1-rfc8226';
import { makeExtRaw } from '../../../tests/test_utils';
import { TNAuthorizationListParser } from './tn_auth_list';

describe('TNAuthorizationListParser', () => {
  const parser = new TNAuthorizationListParser();

  it('registers correct OID', () => {
    expect(parser.oids).toEqual([id_pe_TNAuthList]);
  });

  it('parses telephone number entry', () => {
    // TNAuthorizationList [ TNEntry { one: '+12025551234' } ]
    expect(parser.parse(makeExtRaw(id_pe_TNAuthList, '3010a20e160c2b3132303235353531323334'))).toEqual({
      oid: id_pe_TNAuthList,
      critical: false,
      children: [
        {
          title: 'Telephone Number', value: '+12025551234',
        },
      ],
    });
  });

  it('parses service provider code entry', () => {
    // TNAuthorizationList [ TNEntry { spc: 'provider123' } ]
    expect(parser.parse(makeExtRaw(id_pe_TNAuthList, '300fa00d160b70726f7669646572313233'))).toEqual({
      oid: id_pe_TNAuthList,
      critical: false,
      children: [
        {
          title: 'Service Provider Code', value: 'provider123',
        },
      ],
    });
  });

  it('parses telephone number range entry', () => {
    // TNAuthorizationList [ TNEntry { range: { start: '+12025551000', count: 100 } } ]
    expect(parser.parse(makeExtRaw(id_pe_TNAuthList, '3015a1133011160c2b3132303235353531303030020164'))).toEqual({
      oid: id_pe_TNAuthList,
      critical: false,
      children: [
        {
          title: 'Range',
          children: [
            {
              title: 'Start', value: '+12025551000',
            },
            {
              title: 'Count', value: 100,
            },
          ],
        },
      ],
    });
  });
});
