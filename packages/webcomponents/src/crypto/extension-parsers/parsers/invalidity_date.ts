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
  id_ce_invalidityDate,
  InvalidityDate,
} from '@peculiar/asn1-x509';
import type { IExtensionParser, IParsedExtension } from '../types';
import { node } from '../builders';
import { dateShort } from '../../../utils';

export class InvalidityDateParser implements IExtensionParser {
  readonly oids = [id_ce_invalidityDate];

  parse(extension: Extension): IParsedExtension {
    const id = AsnParser.parse(extension.extnValue.buffer, InvalidityDate);

    return {
      oid: extension.extnID,
      critical: extension.critical ?? false,
      children: [node('Invalidity Date', dateShort(id.value))],
    };
  }
}
