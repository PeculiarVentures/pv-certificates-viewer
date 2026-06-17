/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AsnParser } from '@peculiar/asn1-schema';
import { Convert } from 'pvtsutils';
import {
  Extension,
  SubjectKeyIdentifier,
  id_ce_subjectKeyIdentifier,
} from '@peculiar/asn1-x509';
import type { ExtensionParser, ParsedExtension } from '../types';
import { node } from '../builders';

export class SubjectKeyIdentifierParser implements ExtensionParser {
  readonly oids = [id_ce_subjectKeyIdentifier];

  parse(extension: Extension): ParsedExtension {
    const ski = AsnParser.parse(extension.extnValue.buffer, SubjectKeyIdentifier);

    return {
      oid: extension.extnID,
      critical: extension.critical ?? false,
      children: [
        node('Key Identifier', Convert.ToHex(ski.buffer)),
      ],
    };
  }
}
