/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { InhibitAnyPolicy, id_ce_inhibitAnyPolicy } from '@peculiar/asn1-x509';
import { AsnParser, AsnIntegerArrayBufferConverter } from '@peculiar/asn1-schema';
import { ExtensionFactory } from './extension_factory';
import { BaseExtension } from './base_extension';

/**
 * Inhibit Any Policy Extension
 */
export class InhibitAnyPolicyExtension extends BaseExtension {
  public readonly value: InhibitAnyPolicy;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<InhibitAnyPolicy>(asnExtnValue, InhibitAnyPolicy);
  }

  public override toJSON() {
    return {
      [this.name]: {
        Critical: this.critical,
        'Skip Certs': AsnIntegerArrayBufferConverter.toASN(this.value.value).valueBlock.toString(),
      },
    };
  }
}

ExtensionFactory.register(id_ce_inhibitAnyPolicy, InhibitAnyPolicyExtension);
