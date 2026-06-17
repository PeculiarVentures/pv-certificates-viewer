/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { id_cabforganizationIdentifier } from '../../extensions/cabforganization_identifier';
import { id_appleDeveloperIdDate } from '../../extensions/apple_developer_id_date';
import { makeExtRaw } from '../../../tests/test_utils';
import { CabfOrganizationIdentifierParser, AppleDeveloperIdDateParser } from './cabf_and_apple';

describe('CabfOrganizationIdentifierParser', () => {
  const parser = new CabfOrganizationIdentifierParser();

  it('registers correct OID', () => {
    expect(parser.oids).toContain(id_cabforganizationIdentifier);
  });

  it('parses CABF organization identifier with all fields', () => {
    // SEQUENCE { PS 'NTR', PS 'US', [0] IMPL PS 'CA', UTF8 'US-CA-123456' }
    // 301b13034e545213025553800243410c0c55532d43412d313233343536
    expect(parser.parse(makeExtRaw(
      id_cabforganizationIdentifier,
      '301b13034e545213025553800243410c0c55532d43412d313233343536',
    ))).toEqual({
      oid: id_cabforganizationIdentifier,
      critical: false,
      children: [
        {
          title: 'Organization Identifier',
          children: [
            {
              title: 'Scheme', value: 'NTR',
            },
            {
              title: 'Country', value: 'US',
            },
            {
              title: 'State Or Province', value: 'CA',
            },
            {
              title: 'Reference', value: 'US-CA-123456',
            },
          ],
        },
      ],
    });
  });

  it('parses CABF organization identifier without state', () => {
    // SEQUENCE { PS 'NTR', PS 'DE', UTF8 'DE-123456' }
    // 3012130 34e545213024445 0c09 44452d313233343536
    expect(parser.parse(makeExtRaw(
      id_cabforganizationIdentifier,
      '3012130 34e545213024445 0c09 44452d313233343536'.replace(/\s/g, ''),
    ))).toEqual({
      oid: id_cabforganizationIdentifier,
      critical: false,
      children: [
        {
          title: 'Organization Identifier',
          children: [
            {
              title: 'Scheme', value: 'NTR',
            },
            {
              title: 'Country', value: 'DE',
            },
            {
              title: 'Reference', value: 'DE-123456',
            },
          ],
        },
      ],
    });
  });
});

describe('AppleDeveloperIdDateParser', () => {
  const parser = new AppleDeveloperIdDateParser();

  it('registers correct OID', () => {
    expect(parser.oids).toContain(id_appleDeveloperIdDate);
  });

  it('parses Apple Developer ID date', () => {
    // UTF8String '20150829000000Z' = 0C 0F 32303135303832393030303030305A
    expect(parser.parse(makeExtRaw(
      id_appleDeveloperIdDate,
      '0C0F32303135303832393030303030305A',
    ))).toEqual({
      oid: id_appleDeveloperIdDate,
      critical: false,
      children: [
        {
          title: 'Date', value: '2015-08-29T00:00:00.000Z',
        },
      ],
    });
  });
});
