/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AuthorityKeyIdentifier, id_ce_authorityKeyIdentifier } from '@peculiar/asn1-x509';
import { AsnParser } from '@peculiar/asn1-schema';
import { Convert } from 'pvtsutils';
import { ExtensionFactory } from './extension_factory';
import { BaseExtension } from './base_extension';

/**
 * Authority Key Identifier Extension
 */
export class AuthorityKeyIdentifierExtension extends BaseExtension {
  public readonly value: AuthorityKeyIdentifier;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<AuthorityKeyIdentifier>(asnExtnValue, AuthorityKeyIdentifier);
  }

  public override toJSON() {
    return {
      [this.name]: {
        Critical: this.critical,
        'Key ID': this.value.keyIdentifier ? Convert.ToHex(this.value.keyIdentifier.buffer) : '',
      },
    };
  }
}

ExtensionFactory.register(id_ce_authorityKeyIdentifier, AuthorityKeyIdentifierExtension);
