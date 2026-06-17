/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AsnParser } from '@peculiar/asn1-schema';
import {
  id_netscapeComment,
  id_netscapeCertType,
  NetscapeComment,
  NetscapeCertType,
} from '@peculiar/asn1-x509-netscape';
import type { Extension } from '@peculiar/asn1-x509';
import type { ExtensionParser, ParsedExtension } from '../types';
import { node } from '../builders';

export class NetscapeCommentParser implements ExtensionParser {
  readonly oids = [id_netscapeComment];

  parse(extension: Extension): ParsedExtension {
    const comment = AsnParser.parse(extension.extnValue.buffer, NetscapeComment);

    return {
      oid: extension.extnID,
      critical: extension.critical ?? false,
      children: [node('Comment', comment.value)],
    };
  }
}

export class NetscapeCertTypeParser implements ExtensionParser {
  readonly oids = [id_netscapeCertType];

  parse(extension: Extension): ParsedExtension {
    const certType = AsnParser.parse(extension.extnValue.buffer, NetscapeCertType);
    const flags = certType.toJSON();

    return {
      oid: extension.extnID,
      critical: extension.critical ?? false,
      children: [
        node('Type', flags.join(', ')),
      ],
    };
  }
}
