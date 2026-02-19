/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Timestamp, id_adbe_timestamp } from '@peculiar/asn1-adobe-acrobat';
import { AsnParser } from '@peculiar/asn1-schema';
import type { IJsonRenderObject } from '../../components/certificate-details-parts/json_to_html_parser';
import { ExtensionFactory } from './extension_factory';
import { BaseExtension } from './base_extension';
import { GeneralNameParser } from './general_name_parser';

/**
 * Timestamp Extension
 */
export class TimestampExtension extends BaseExtension {
  public readonly value: Timestamp;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<Timestamp>(asnExtnValue, Timestamp);
  }

  public override toJSON() {
    const content: Record<string, unknown> = {
      Critical: this.critical,
      Version: this.value.version,
      'Requires Auth': this.value.requiresAuth ? 'Yes' : 'No',
    };

    if (this.value.location) {
      Object.assign(content, GeneralNameParser.toObject(this.value.location) as IJsonRenderObject);
    }

    return this.extJson(content);
  }
}

ExtensionFactory.register(id_adbe_timestamp, TimestampExtension);
