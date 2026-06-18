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
import type { IExtensionParser, IParsedExtension } from '../types';
import { node } from '../builders';

function decodeAttributeValue(buf: ArrayBuffer): string {
  try {
    return AsnParser.parse(buf, AttributeValue).toString();
  } catch {
    return Convert.ToHex(buf);
  }
}

export class SubjectDirectoryAttributesParser implements IExtensionParser {
  readonly oids = [id_ce_subjectDirectoryAttributes];

  parse(extension: Extension): IParsedExtension {
    const sda = AsnParser.parse(extension.extnValue.buffer, SubjectDirectoryAttributes);

    return {
      oid: extension.extnID,
      critical: extension.critical ?? false,
      children: sda.map((attribute) => {
        const values = attribute.values.map((v) => decodeAttributeValue(v));

        return node(attribute.type, values.join(', '));
      }),
    };
  }
}
