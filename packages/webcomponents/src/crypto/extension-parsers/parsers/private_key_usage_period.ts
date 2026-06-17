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
  id_ce_privateKeyUsagePeriod,
  PrivateKeyUsagePeriod,
} from '@peculiar/asn1-x509';
import type {
  ExtensionNode,
  ExtensionParser,
  ParsedExtension,
} from '../types';
import { node } from '../builders';
import { dateShort } from '../../../utils';

export class PrivateKeyUsagePeriodParser implements ExtensionParser {
  readonly oids = [id_ce_privateKeyUsagePeriod];

  parse(extension: Extension): ParsedExtension {
    const pkup = AsnParser.parse(extension.extnValue.buffer, PrivateKeyUsagePeriod);
    const children: ExtensionNode[] = [];

    if (pkup.notBefore != null) {
      children.push(node('Not Before', dateShort(pkup.notBefore)));
    }

    if (pkup.notAfter != null) {
      children.push(node('Not After', dateShort(pkup.notAfter)));
    }

    return {
      oid: extension.extnID,
      critical: extension.critical ?? false,
      children,
    };
  }
}
