/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { WebGDPR, id_WebGDPR } from '@peculiar/asn1-ntqwac';
import { AsnParser } from '@peculiar/asn1-schema';
import type { IJsonRenderObject } from '../../components/certificate-details-parts/json_to_html_parser';
import { GeneralNameParser } from '../extensions/general_name_parser';
import { AttributeFactory } from './attribute_factory';
import { BaseAttribute } from './base_attribute';

/**
 * Web GDPR Attribute
 */
export class WebGdprAttribute extends BaseAttribute {
  public static override readonly NAME = 'Web GDPR';

  public readonly value: WebGDPR;

  constructor(raw: BufferSource) {
    super(raw);

    const asnAttrValue = this.asn.values[0];

    this.value = AsnParser.parse<WebGDPR>(asnAttrValue, WebGDPR);
  }

  public override toJSON() {
    const content: Record<string, unknown> = {};

    if (this.value.assessmentAuthority) {
      content['Assessment Authority'] = GeneralNameParser.toObject(this.value.assessmentAuthority) as IJsonRenderObject;
    }

    if (this.value.assessmentLocation) {
      content['Assessment Location'] = GeneralNameParser.toObject(this.value.assessmentLocation) as IJsonRenderObject;
    }

    if (this.value.assessmentRef) {
      content['Assessment Ref'] = GeneralNameParser.toObject(this.value.assessmentRef) as IJsonRenderObject;
    }

    if (this.value.dataStorageTerritory) {
      content['Data Storage Territory'] = this.value.dataStorageTerritory;
    }

    if (this.value.description) {
      content.Description = this.value.description;
    }

    return this.attrJson(content);
  }
}

AttributeFactory.register(id_WebGDPR, WebGdprAttribute);
