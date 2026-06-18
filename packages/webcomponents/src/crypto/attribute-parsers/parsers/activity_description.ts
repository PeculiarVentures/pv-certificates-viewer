/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AsnParser } from '@peculiar/asn1-schema';
import { Attribute as AsnAttribute } from '@peculiar/asn1-x509';
import { id_ActivityDescription, ActivityDescription } from '@peculiar/asn1-ntqwac';
import type { IAttributeParser, IParsedAttribute } from '../types';
import { node, section } from '../../extension-parsers/builders';
import { parseGeneralName } from '../../extension-parsers/parse_general_name';

export class ActivityDescriptionParser implements IAttributeParser {
  readonly oids = [id_ActivityDescription];

  parse(attribute: AsnAttribute): IParsedAttribute {
    const ad = AsnParser.parse(attribute.values[0], ActivityDescription);
    const children = [
      section('Code Authority', [parseGeneralName(ad.codeAuthority)]),
      section('Code ID', [parseGeneralName(ad.codeId)]),
      node('Short Name', ad.shortName),
      node('Short Description', ad.shortDescription),
    ];

    return {
      oid: attribute.type, children,
    };
  }
}
