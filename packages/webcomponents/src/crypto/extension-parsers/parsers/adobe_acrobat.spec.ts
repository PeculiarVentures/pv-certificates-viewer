/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { id_adbe_timestamp, id_adbe_archiveRevInfo } from '@peculiar/asn1-adobe-acrobat';
import { makeExtRaw } from '../../../tests/test_utils';
import { AdobeTimestampParser, AdobeArchiveRevInfoParser } from './adobe_acrobat';

describe('AdobeTimestampParser', () => {
  const parser = new AdobeTimestampParser();

  it('registers correct OID', () => {
    expect(parser.oids).toEqual([id_adbe_timestamp]);
  });

  it('parses Timestamp with URI location', () => {
    // SEQUENCE { INTEGER 1, [6] 'http://timestamp.example.com/', BOOLEAN FALSE }
    // 3022 020101 861d 687474703a2f2f74696d657374616d702e6578616d706c652e636f6d2f
    expect(parser.parse(makeExtRaw(
      id_adbe_timestamp,
      '3022020101861d687474703a2f2f74696d657374616d702e6578616d706c652e636f6d2f',
    ))).toEqual({
      oid: id_adbe_timestamp,
      critical: false,
      children: [
        {
          title: 'Timestamp',
          children: [
            {
              title: 'Version', value: 1,
            },
            {
              title: 'Location',
              children: [{
                title: 'URI', value: 'http://timestamp.example.com/',
              }],
            },
            {
              title: 'Requires Auth', value: false,
            },
          ],
        },
      ],
    });
  });
});

describe('AdobeArchiveRevInfoParser', () => {
  const parser = new AdobeArchiveRevInfoParser();

  it('registers correct OID', () => {
    expect(parser.oids).toEqual([id_adbe_archiveRevInfo]);
  });

  it('parses ArchiveRevInfo version', () => {
    // SEQUENCE { INTEGER 1 } = 3003 020101
    expect(parser.parse(makeExtRaw(id_adbe_archiveRevInfo, '3003020101'))).toEqual({
      oid: id_adbe_archiveRevInfo,
      critical: false,
      children: [{
        title: 'Version', value: 1,
      }],
    });
  });
});
