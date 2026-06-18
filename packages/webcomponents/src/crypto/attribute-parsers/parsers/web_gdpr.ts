/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AsnParser } from '@peculiar/asn1-schema';
import { Attribute as AsnAttribute } from '@peculiar/asn1-x509';
import { id_WebGDPR, WebGDPR } from '@peculiar/asn1-ntqwac';
import type {
  AttributeParser, ExtensionNode, ParsedAttribute,
} from '../types';
import { node, section } from '../../extension-parsers/builders';
import { parseGeneralName } from '../../extension-parsers/parse_general_name';

export class WebGDPRParser implements AttributeParser {
  readonly oids = [id_WebGDPR];

  parse(attribute: AsnAttribute): ParsedAttribute {
    const wg = AsnParser.parse(attribute.values[0], WebGDPR);
    const children: ExtensionNode[] = [
      section('Assessment Authority', [parseGeneralName(wg.assessmentAuthority)]),
      section('Assessment Reference', [parseGeneralName(wg.assessmentRef)]),
      section('Assessment Location', [parseGeneralName(wg.assessmentLocation)]),
    ];

    if (wg.dataStorageTerritory != null) {
      children.push(node('Data Storage Territory', wg.dataStorageTerritory));
    }

    if (wg.description != null) {
      children.push(node('Description', wg.description));
    }

    return {
      oid: attribute.type, children,
    };
  }
}
