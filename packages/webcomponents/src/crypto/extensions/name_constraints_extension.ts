/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { NameConstraints, id_ce_nameConstraints } from '@peculiar/asn1-x509';
import { AsnParser } from '@peculiar/asn1-schema';
import { ExtensionFactory } from './extension_factory';
import { BaseExtension } from './base_extension';
import { GeneralNameParser } from './general_name_parser';

/**
 * Name Constraints Extension
 */
export class NameConstraintsExtension extends BaseExtension {
  public readonly value: NameConstraints;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<NameConstraints>(asnExtnValue, NameConstraints);
  }

  private subtreeToObject(subtree: { base: unknown; minimum?: unknown; maximum?: unknown }): Record<string, unknown> {
    const obj = { ...GeneralNameParser.toObject(subtree.base) } as Record<string, unknown>;

    if (subtree.minimum !== undefined) {
      obj.Minimum = subtree.minimum.toString();
    }

    if (subtree.maximum !== undefined) {
      obj.Maximum = subtree.maximum.toString();
    }

    return obj;
  }

  public override toJSON() {
    const content: Record<string, unknown> = { Critical: this.critical };

    if (this.value.excludedSubtrees?.length) {
      content['Excluded Subtrees'] = this.value.excludedSubtrees.map((s) => this.subtreeToObject(s));
    }

    if (this.value.permittedSubtrees?.length) {
      content['Permitted Subtrees'] = this.value.permittedSubtrees.map((s) => this.subtreeToObject(s));
    }

    return this.extJson(content);
  }
}

ExtensionFactory.register(id_ce_nameConstraints, NameConstraintsExtension);
