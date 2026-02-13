/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AuthorityKeyIdentifier } from '@peculiar/asn1-x509';
import { AsnParser } from '@peculiar/asn1-schema';
import { Convert } from 'pvtsutils';
import { BaseExtension } from './base_extension';

/**
 * Authority Key Identifier Extension
 */
export class AuthorityKeyIdentifierExtension extends BaseExtension {
  public static override readonly NAME = 'Authority Key Identifier';

  public readonly value: AuthorityKeyIdentifier;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<AuthorityKeyIdentifier>(asnExtnValue, AuthorityKeyIdentifier);
  }

  public override toJSON(): Record<string, string | number | boolean> {
    return {
      Name: AuthorityKeyIdentifierExtension.NAME,
      Critical: this.critical ? 'Yes' : 'No',
      'Key ID': this.value.keyIdentifier ? Convert.ToHex(this.value.keyIdentifier.buffer) : '',
    };
  }
}
