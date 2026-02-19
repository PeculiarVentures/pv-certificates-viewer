/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Attribute as AsnAttribute } from '@peculiar/asn1-x509';
import { AsnConvert } from '@peculiar/asn1-schema';
import { Convert } from 'pvtsutils';
import type { IJsonRenderObject } from '../../components/certificate-details-parts/json_to_html_parser';
import { getStringByOID } from '../../utils';
import { BaseAttribute } from './base_attribute';

type AttributeClass = new (raw: BufferSource) => BaseAttribute;

/**
 * Factory for creating attribute instances based on OID
 */
export class AttributeFactory {
  private static attributeClasses: Record<string, AttributeClass> = {};

  public static register(oid: string, attributeClass: AttributeClass): void {
    AttributeFactory.attributeClasses[oid] = attributeClass;
  }

  public static parse(raw: BufferSource): BaseAttribute | null {
    try {
      const asnAttribute = AsnConvert.parse(raw, AsnAttribute);
      const AttributeClass = AttributeFactory.attributeClasses[asnAttribute.type];

      if (AttributeClass) {
        return new AttributeClass(raw);
      }

      return null;
    } catch (error) {
      console.error('Error parsing attribute:', error);

      return null;
    }
  }

  public static toJSON(raw: BufferSource): IJsonRenderObject {
    const attr = AttributeFactory.parse(raw);

    if (attr) {
      return attr.toJSON();
    }

    const asnAttribute = AsnConvert.parse(raw, AsnAttribute);
    const value = asnAttribute.values?.[0];

    return {
      [getStringByOID(asnAttribute.type)]: {
        Value: Convert.ToHex(value),
      },
    } as IJsonRenderObject;
  }
}
