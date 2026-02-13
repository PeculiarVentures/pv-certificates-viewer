/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LeiChoice } from '@peculiar/asn1-lei';
import { AsnParser } from '@peculiar/asn1-schema';
import { BaseExtension } from './base_extension';

/**
 * Legal Entity Identifier (LEI) Choice Extension
 */
export class LeiChoiceExtension extends BaseExtension {
  public static override readonly NAME = 'Legal Entity Identifier';

  public readonly value: LeiChoice;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<LeiChoice>(asnExtnValue, LeiChoice);
  }

  public override toJSON(): Record<string, string | number | boolean> {
    return {
      Name: LeiChoiceExtension.NAME,
      Critical: this.critical ? 'Yes' : 'No',
      Identifier: this.value.text,
    };
  }
}
