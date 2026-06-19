/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AsnParser } from '@peculiar/asn1-schema';
import {
  Extension,
  KeyUsage,
  id_ce_keyUsage,
} from '@peculiar/asn1-x509';
import type { IExtensionParser, IParsedExtension } from '../types';
import { node } from '../builders';

export class KeyUsageParser implements IExtensionParser {
  readonly oids = [id_ce_keyUsage];

  parse(extension: Extension): IParsedExtension {
    const ku = AsnParser.parse(extension.extnValue.buffer, KeyUsage);

    return {
      oid: extension.extnID,
      critical: extension.critical ?? false,
      children: [
        node('Usage', ku.toJSON().join(', ')),
      ],
    };
  }
}
