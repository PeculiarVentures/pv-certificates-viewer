/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AsnParser } from '@peculiar/asn1-schema';
import {
  AuthorityInfoAccessSyntax,
  Extension,
  id_pe_authorityInfoAccess,
} from '@peculiar/asn1-x509';
import type { IExtensionParser, IParsedExtension } from '../types';
import { node, section } from '../builders';
import { parseGeneralName } from '../parse_general_name';

export class AuthorityInformationAccessParser implements IExtensionParser {
  readonly oids = [id_pe_authorityInfoAccess];

  parse(extension: Extension): IParsedExtension {
    const aia = AsnParser.parse(extension.extnValue.buffer, AuthorityInfoAccessSyntax);

    return {
      oid: extension.extnID,
      critical: extension.critical ?? false,
      children: [
        section('Descriptions', aia.map((desc) => section('', [
          node('Method', desc.accessMethod),
          parseGeneralName(desc.accessLocation),
        ]))),
      ],
    };
  }
}
