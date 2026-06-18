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
  AuthorityKeyIdentifier,
  Extension,
  id_ce_authorityKeyIdentifier,
} from '@peculiar/asn1-x509';
import type {
  ExtensionNode, ExtensionParser, ParsedExtension,
} from '../types';
import { node } from '../builders';

export class AuthorityKeyIdentifierParser implements ExtensionParser {
  readonly oids = [id_ce_authorityKeyIdentifier];

  parse(extension: Extension): ParsedExtension {
    const aki = AsnParser.parse(extension.extnValue.buffer, AuthorityKeyIdentifier);

    const children: ExtensionNode[] = [];

    if (aki.keyIdentifier != null) {
      children.push(node('Key Identifier', Convert.ToHex(aki.keyIdentifier.buffer), 'authorityKeyId'));
    }

    if (aki.authorityCertSerialNumber != null) {
      children.push(node('Serial Number', Convert.ToHex(aki.authorityCertSerialNumber)));
    }

    return {
      oid: extension.extnID,
      critical: extension.critical ?? false,
      children,
    };
  }
}
