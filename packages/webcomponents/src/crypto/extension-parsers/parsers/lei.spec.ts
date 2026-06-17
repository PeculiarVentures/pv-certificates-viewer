/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { id_lei, id_role } from '@peculiar/asn1-lei';
import { makeExtRaw } from '../../../tests/test_utils';
import { LeiParser, LeiRoleParser } from './lei';

describe('LeiParser', () => {
  const parser = new LeiParser();

  it('registers correct OID', () => {
    expect(parser.oids).toContain(id_lei);
  });

  it('parses LEI PrintableString code', () => {
    // PrintableString '529900T8BM49AURSDO55' = 13 14 ...
    expect(parser.parse(makeExtRaw(
      id_lei,
      '13143532393930305438424d343941555253444f3535',
    ))).toEqual({
      oid: id_lei,
      critical: false,
      children: [{
        title: 'LEI Code', value: '529900T8BM49AURSDO55',
      }],
    });
  });
});

describe('LeiRoleParser', () => {
  const parser = new LeiRoleParser();

  it('registers correct OID', () => {
    expect(parser.oids).toContain(id_role);
  });

  it('parses LEI Role', () => {
    // PrintableString 'INTE' = 13 04 494e5445
    expect(parser.parse(makeExtRaw(id_role, '1304494e5445'))).toEqual({
      oid: id_role,
      critical: false,
      children: [{
        title: 'Role', value: 'INTE',
      }],
    });
  });
});
