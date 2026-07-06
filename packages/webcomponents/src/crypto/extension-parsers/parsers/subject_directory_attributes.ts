/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AsnParser } from '@peculiar/asn1-schema';
import { DateOfBirth, id_pkcs9_at_dateOfBirth } from '@peculiar/asn1-pkcs9';
import {
  AttributeValue,
  Extension,
  id_ce_subjectDirectoryAttributes,
  SubjectDirectoryAttributes,
} from '@peculiar/asn1-x509';
import { Convert } from 'pvtsutils';
import type { IExtensionParser, IParsedExtension } from '../types';
import { node } from '../builders';
import { dateShort } from '../../../utils';

function decodeDateOfBirth(buf: ArrayBuffer): string | null {
  try {
    return dateShort(AsnParser.parse(buf, DateOfBirth).value);
  } catch {
    return null;
  }
}

function decodeAttributeValue(attributeType: string, buf: ArrayBuffer): string {
  if (attributeType === id_pkcs9_at_dateOfBirth) {
    const dateOfBirth = decodeDateOfBirth(buf);

    if (dateOfBirth) {
      return dateOfBirth;
    }
  }

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
        const values = attribute.values.map((v) => decodeAttributeValue(attribute.type, v));

        return node(attribute.type, values.join(', '));
      }),
    };
  }
}
