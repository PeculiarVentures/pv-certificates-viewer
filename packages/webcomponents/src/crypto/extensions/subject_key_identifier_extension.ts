/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { SubjectKeyIdentifier } from '@peculiar/asn1-x509';
import { AsnParser } from '@peculiar/asn1-schema';
import { Convert } from 'pvtsutils';
import { BaseExtension } from './base_extension';

/**
 * Subject Key Identifier Extension
 */
export class SubjectKeyIdentifierExtension extends BaseExtension {
  public static override readonly NAME = 'Subject Key Identifier';

  public readonly value: SubjectKeyIdentifier;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<SubjectKeyIdentifier>(asnExtnValue, SubjectKeyIdentifier);
  }

  public override toJSON(): Record<string, string | number | boolean> {
    return {
      Name: SubjectKeyIdentifierExtension.NAME,
      Critical: this.critical ? 'Yes' : 'No',
      'Key ID': Convert.ToHex(this.value.buffer),
    };
  }
}
