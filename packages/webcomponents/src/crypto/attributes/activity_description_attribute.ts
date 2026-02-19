/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ActivityDescription, id_ActivityDescription } from '@peculiar/asn1-ntqwac';
import { AsnParser } from '@peculiar/asn1-schema';
import type { IJsonRenderObject } from '../../components/certificate-details-parts/json_to_html_parser';
import { GeneralNameParser } from '../extensions/general_name_parser';
import { AttributeFactory } from './attribute_factory';
import { BaseAttribute } from './base_attribute';

/**
 * Activity Description Attribute
 */
export class ActivityDescriptionAttribute extends BaseAttribute {
  public static override readonly NAME = 'Activity Description';

  public readonly value: ActivityDescription;

  constructor(raw: BufferSource) {
    super(raw);

    const asnAttrValue = this.asn.values[0];

    this.value = AsnParser.parse<ActivityDescription>(asnAttrValue, ActivityDescription);
  }

  public override toJSON() {
    const content: Record<string, unknown> = {};

    if (this.value.codeAuthority) {
      content['Code Authority'] = GeneralNameParser.toObject(this.value.codeAuthority) as IJsonRenderObject;
    }

    if (this.value.codeId) {
      content['Code ID'] = GeneralNameParser.toObject(this.value.codeId) as IJsonRenderObject;
    }

    if (this.value.shortName) {
      content['Short Name'] = this.value.shortName;
    }

    if (this.value.shortDescription) {
      content['Short Description'] = this.value.shortDescription;
    }

    return this.attrJson(content);
  }
}

AttributeFactory.register(id_ActivityDescription, ActivityDescriptionAttribute);
