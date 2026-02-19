/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ExtendedKeyUsage, id_ce_extKeyUsage } from '@peculiar/asn1-x509';
import { AsnParser } from '@peculiar/asn1-schema';
import { getStringByOID } from '../../utils';
import { ExtensionFactory } from './extension_factory';
import { BaseExtension } from './base_extension';

/**
 * Extended Key Usage Extension
 */
export class ExtendedKeyUsageExtension extends BaseExtension {
  public readonly value: ExtendedKeyUsage;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<ExtendedKeyUsage>(asnExtnValue, ExtendedKeyUsage);
  }

  public override toJSON() {
    return {
      [this.name]: {
        Critical: this.critical,
        Purposes: this.value.map((purpose) => getStringByOID(purpose, true)).join(', '),
      },
    };
  }
}

ExtensionFactory.register(id_ce_extKeyUsage, ExtendedKeyUsageExtension);
