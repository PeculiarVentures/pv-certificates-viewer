/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { BasicConstraints, id_ce_basicConstraints } from '@peculiar/asn1-x509';
import { AsnParser } from '@peculiar/asn1-schema';
import { row, rowGroup } from '../rows_format';
import { ExtensionFactory } from './extension_factory';
import { BaseExtension } from './base_extension';

/**
 * Basic Constraints Extension
 */
export class BasicConstraintsExtension extends BaseExtension {
  public readonly value: BasicConstraints;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<BasicConstraints>(asnExtnValue, BasicConstraints);
  }

  public override toJSON() {
    return rowGroup(this.name, [[
      row('Critical', this.critical),
      row('Certificate Authority', this.value.cA ? 'Yes' : 'No'),
      ...(this.value.pathLenConstraint !== undefined ? [row('Path Length Constraint', this.value.pathLenConstraint)] : []),
    ]]);
  }
}

ExtensionFactory.register(id_ce_basicConstraints, BasicConstraintsExtension);
