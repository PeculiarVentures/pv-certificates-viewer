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
  ExtendedKeyUsage,
  id_ce_extKeyUsage,
} from '@peculiar/asn1-x509';
import type { IExtensionParser, IParsedExtension } from '../types';
import { node, section } from '../builders';

export class ExtendedKeyUsageParser implements IExtensionParser {
  readonly oids = [id_ce_extKeyUsage];

  parse(extension: Extension): IParsedExtension {
    const eku = AsnParser.parse(extension.extnValue.buffer, ExtendedKeyUsage);

    return {
      oid: extension.extnID,
      critical: extension.critical ?? false,
      children: [
        section('Purposes', eku.map((purposeOid) => node('Purpose', purposeOid))),
      ],
    };
  }
}
