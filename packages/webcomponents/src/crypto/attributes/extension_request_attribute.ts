/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ExtensionRequest, id_pkcs9_at_extensionRequest } from '@peculiar/asn1-pkcs9';
import { AsnParser, AsnConvert } from '@peculiar/asn1-schema';
import { ExtensionFactory } from '../extensions';
import { AttributeFactory } from './attribute_factory';
import { BaseAttribute } from './base_attribute';

/**
 * Extension Request Attribute
 */
export class ExtensionRequestAttribute extends BaseAttribute {
  public static override readonly NAME = 'Extension Request';

  public readonly value: ExtensionRequest;

  constructor(raw: BufferSource) {
    super(raw);

    const asnAttrValue = this.asn.values[0];

    this.value = AsnParser.parse<ExtensionRequest>(asnAttrValue, ExtensionRequest);
  }

  public override toJSON() {
    const extensions = this.value.map((e) => ExtensionFactory.toJSON(AsnConvert.serialize(e)));

    return this.attrJson({ Extensions: extensions });
  }
}

AttributeFactory.register(id_pkcs9_at_extensionRequest, ExtensionRequestAttribute);
