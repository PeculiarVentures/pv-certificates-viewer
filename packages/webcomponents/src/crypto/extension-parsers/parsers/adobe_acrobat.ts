/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AsnParser } from '@peculiar/asn1-schema';
import {
  ArchiveRevInfo,
  Timestamp,
  id_adbe_archiveRevInfo,
  id_adbe_timestamp,
} from '@peculiar/asn1-adobe-acrobat';
import type { Extension } from '@peculiar/asn1-x509';
import type { ExtensionParser, ParsedExtension } from '../types';
import { node, section } from '../builders';
import { parseGeneralName } from '../parse_general_name';

export class AdobeTimestampParser implements ExtensionParser {
  readonly oids = [id_adbe_timestamp];

  parse(extension: Extension): ParsedExtension {
    const ts = AsnParser.parse(extension.extnValue.buffer, Timestamp);

    return {
      oid: extension.extnID,
      critical: extension.critical ?? false,
      children: [
        section('Timestamp', [
          node('Version', ts.version),
          section('Location', [parseGeneralName(ts.location)]),
          node('Requires Auth', ts.requiresAuth),
        ]),
      ],
    };
  }
}

export class AdobeArchiveRevInfoParser implements ExtensionParser {
  readonly oids = [id_adbe_archiveRevInfo];

  parse(extension: Extension): ParsedExtension {
    const ari = AsnParser.parse(extension.extnValue.buffer, ArchiveRevInfo);

    return {
      oid: extension.extnID,
      critical: extension.critical ?? false,
      children: [
        node('Version', ari.version),
      ],
    };
  }
}
