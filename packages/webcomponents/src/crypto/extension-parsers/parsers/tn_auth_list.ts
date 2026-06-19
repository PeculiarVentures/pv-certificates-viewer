/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AsnParser } from '@peculiar/asn1-schema';
import {
  TNAuthorizationList,
  id_pe_TNAuthList,
} from '@peculiar/asn1-rfc8226';
import type { Extension } from '@peculiar/asn1-x509';
import type {
  IExtensionParser, IParsedExtension, IExtensionNode,
} from '../types';
import { node, section } from '../builders';

export class TNAuthorizationListParser implements IExtensionParser {
  readonly oids = [id_pe_TNAuthList];

  parse(extension: Extension): IParsedExtension {
    const list = AsnParser.parse(extension.extnValue.buffer, TNAuthorizationList);
    const children: IExtensionNode[] = [];

    for (const entry of Array.from(list)) {
      if (entry.spc != null) {
        children.push(node('Service Provider Code', entry.spc));
      } else if (entry.range != null) {
        children.push(section('Range', [
          node('Start', entry.range.start),
          node('Count', entry.range.count),
        ]));
      } else if (entry.one != null) {
        children.push(node('Telephone Number', entry.one));
      }
    }

    return {
      oid: extension.extnID,
      critical: extension.critical ?? false,
      children,
    };
  }
}
