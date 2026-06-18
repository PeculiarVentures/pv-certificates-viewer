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
  id_ce_issuerAltName,
  IssueAlternativeName,
} from '@peculiar/asn1-x509';
import type { IExtensionParser, IParsedExtension } from '../types';
import { parseGeneralName } from '../parse_general_name';

export class IssuerAlternativeNameParser implements IExtensionParser {
  readonly oids = [id_ce_issuerAltName];

  parse(extension: Extension): IParsedExtension {
    const ian = AsnParser.parse(extension.extnValue.buffer, IssueAlternativeName);

    return {
      oid: extension.extnID,
      critical: extension.critical ?? false,
      children: ian.map(parseGeneralName),
    };
  }
}
