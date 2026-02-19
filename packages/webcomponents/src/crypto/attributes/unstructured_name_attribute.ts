/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { UnstructuredName, id_pkcs9_at_unstructuredName } from '@peculiar/asn1-pkcs9';
import { AsnParser } from '@peculiar/asn1-schema';
import { AttributeFactory } from './attribute_factory';
import { BaseAttribute } from './base_attribute';

/**
 * Unstructured Name Attribute
 */
export class UnstructuredNameAttribute extends BaseAttribute {
  public static override readonly NAME = 'Unstructured Name';

  public readonly value: UnstructuredName;

  constructor(raw: BufferSource) {
    super(raw);

    const asnAttrValue = this.asn.values[0];

    this.value = AsnParser.parse<UnstructuredName>(asnAttrValue, UnstructuredName);
  }

  public override toJSON() {
    return this.attrJson({ Value: this.value.toString() });
  }
}

AttributeFactory.register(id_pkcs9_at_unstructuredName, UnstructuredNameAttribute);
