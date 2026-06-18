/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AsnParser } from '@peculiar/asn1-schema';
import { Attribute as AsnAttribute } from '@peculiar/asn1-x509';
import { id_TypeRelationship, TypeRelationship } from '@peculiar/asn1-ntqwac';
import type { AttributeParser, ParsedAttribute } from '../types';
import { node } from '../../extension-parsers/builders';

export class TypeRelationshipParser implements AttributeParser {
  readonly oids = [id_TypeRelationship];

  parse(attribute: AsnAttribute): ParsedAttribute {
    const tr = AsnParser.parse(attribute.values[0], TypeRelationship);

    const children = (Object.keys(tr) as (keyof TypeRelationship)[])
      .filter((k) => tr[k] != null)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((k) => node(String(k), (tr[k] as any).toNumber() ? 'Yes' : 'No'));

    return {
      oid: attribute.type, children,
    };
  }
}
