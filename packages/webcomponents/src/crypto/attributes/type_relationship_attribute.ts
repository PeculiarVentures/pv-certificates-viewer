/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { TypeRelationship, id_TypeRelationship } from '@peculiar/asn1-ntqwac';
import { AsnParser } from '@peculiar/asn1-schema';
import { AttributeFactory } from './attribute_factory';
import { BaseAttribute } from './base_attribute';

/**
 * Type Relationship Attribute
 */
export class TypeRelationshipAttribute extends BaseAttribute {
  public static override readonly NAME = 'Type Relationship';

  public readonly value: TypeRelationship;

  constructor(raw: BufferSource) {
    super(raw);

    const asnAttrValue = this.asn.values[0];

    this.value = AsnParser.parse<TypeRelationship>(asnAttrValue, TypeRelationship);
  }

  public override toJSON() {
    const content: Record<string, string> = {};

    Object.keys(this.value).forEach((keyName) => {
      content[keyName] = this.value[keyName].toNumber() ? 'Yes' : 'No';
    });

    return this.attrJson(content);
  }
}

AttributeFactory.register(id_TypeRelationship, TypeRelationshipAttribute);
