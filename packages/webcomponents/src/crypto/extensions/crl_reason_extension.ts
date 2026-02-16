/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CRLReason, id_ce_cRLReasons } from '@peculiar/asn1-x509';
import { AsnParser } from '@peculiar/asn1-schema';
import { ExtensionFactory } from './extension_factory';
import { BaseExtension } from './base_extension';

/**
 * CRL Reason Extension
 */
export class CRLReasonExtension extends BaseExtension {
  public static override readonly NAME = 'CRL Reason';

  public readonly value: CRLReason;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<CRLReason>(asnExtnValue, CRLReason);
  }

  public override toJSON(): Record<string, string | number | boolean> {
    return {
      Name: CRLReasonExtension.NAME,
      Critical: this.critical ? 'Yes' : 'No',
      Reason: this.value.toJSON(),
    };
  }
}

ExtensionFactory.register(id_ce_cRLReasons, CRLReasonExtension);
