/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AsnParser } from '@peculiar/asn1-schema';
import {
  AttributeValue,
  Extension,
  id_ce_subjectDirectoryAttributes,
  SubjectDirectoryAttributes,
} from '@peculiar/asn1-x509';
import { Convert } from 'pvtsutils';
import { OIDs } from '../../../constants/oids';
import type { ExtensionParser, ParsedExtension } from '../types';
import { node, section } from '../builders';

function decodeAttributeValue(buf: ArrayBuffer): string {
  try {
    return AsnParser.parse(buf, AttributeValue).toString();
  } catch {
    return Convert.ToHex(buf);
  }
}

export class SubjectDirectoryAttributesParser implements ExtensionParser {
  readonly oids = [id_ce_subjectDirectoryAttributes];

  parse(extension: Extension): ParsedExtension {
    const sda = AsnParser.parse(extension.extnValue.buffer, SubjectDirectoryAttributes);

    return {
      oid: extension.extnID,
      critical: extension.critical ?? false,
      children: sda.map((attribute) => {
        const label = OIDs[attribute.type] ?? attribute.type;
        const values = attribute.values.map((v) => node('Value', decodeAttributeValue(v)));

        return section(label, values);
      }),
    };
  }
}
