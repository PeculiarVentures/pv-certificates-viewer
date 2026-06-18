/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AsnParser } from '@peculiar/asn1-schema';
import {
  LeiChoice,
  LeiRole,
  id_lei,
  id_role,
} from '@peculiar/asn1-lei';
import type { Extension } from '@peculiar/asn1-x509';
import type { ExtensionParser, ParsedExtension } from '../types';
import { node, section } from '../builders';

export class LeiParser implements ExtensionParser {
  readonly oids = [id_lei];

  parse(extension: Extension): ParsedExtension {
    const lei = AsnParser.parse(extension.extnValue.buffer, LeiChoice);
    const children = [];

    if (lei.struct != null) {
      children.push(node('LEI Code', lei.struct.leiCode, 'lei'));

      if (lei.struct.leiRole != null) {
        children.push(node('LEI Role', lei.struct.leiRole));
      }

      return {
        oid: extension.extnID,
        critical: extension.critical ?? false,
        children: [section('LEI', children)],
      };
    }

    return {
      oid: extension.extnID,
      critical: extension.critical ?? false,
      children: [node('LEI Code', lei.text ?? '', 'lei')],
    };
  }
}

export class LeiRoleParser implements ExtensionParser {
  readonly oids = [id_role];

  parse(extension: Extension): ParsedExtension {
    const role = AsnParser.parse(extension.extnValue.buffer, LeiRole);

    return {
      oid: extension.extnID,
      critical: extension.critical ?? false,
      children: [node('Role', role.text ?? '')],
    };
  }
}
