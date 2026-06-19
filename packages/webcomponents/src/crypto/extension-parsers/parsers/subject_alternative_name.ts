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
  id_ce_subjectAltName,
  SubjectAlternativeName,
} from '@peculiar/asn1-x509';
import type { IExtensionParser, IParsedExtension } from '../types';
import { parseGeneralName } from '../parse_general_name';

export class SubjectAlternativeNameParser implements IExtensionParser {
  readonly oids = [id_ce_subjectAltName];

  parse(extension: Extension): IParsedExtension {
    const san = AsnParser.parse(extension.extnValue.buffer, SubjectAlternativeName);

    return {
      oid: extension.extnID,
      critical: extension.critical ?? false,
      children: san.map(parseGeneralName),
    };
  }
}
