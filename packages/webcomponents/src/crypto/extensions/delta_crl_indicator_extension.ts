/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { BaseCRLNumber, id_ce_deltaCRLIndicator } from '@peculiar/asn1-x509';
import { AsnParser } from '@peculiar/asn1-schema';
import { ExtensionFactory } from './extension_factory';
import { BaseExtension } from './base_extension';

/**
 * Delta CRL Indicator Extension
 */
export class DeltaCRLIndicatorExtension extends BaseExtension {
  public readonly value: BaseCRLNumber;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<BaseCRLNumber>(asnExtnValue, BaseCRLNumber);
  }

  public override toJSON() {
    return {
      [this.name]: {
        Critical: this.critical,
        Value: this.value.value.toString(),
      },
    };
  }
}

ExtensionFactory.register(id_ce_deltaCRLIndicator, DeltaCRLIndicatorExtension);
