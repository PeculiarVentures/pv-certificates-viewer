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
  id_ce_policyMappings,
  PolicyMappings,
} from '@peculiar/asn1-x509';
import type { ExtensionParser, ParsedExtension } from '../types';
import { section, node } from '../builders';

export class PolicyMappingsParser implements ExtensionParser {
  readonly oids = [id_ce_policyMappings];

  parse(extension: Extension): ParsedExtension {
    const mappings = AsnParser.parse(extension.extnValue.buffer, PolicyMappings);

    return {
      oid: extension.extnID,
      critical: extension.critical ?? false,
      children: [
        section('Mappings', mappings.map((mapping) => section('', [
          node('Issuer Domain Policy', mapping.issuerDomainPolicy),
          node('Subject Domain Policy', mapping.subjectDomainPolicy),
        ]))),
      ],
    };
  }
}
