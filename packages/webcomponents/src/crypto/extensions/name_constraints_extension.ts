/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { NameConstraints, id_ce_nameConstraints } from '@peculiar/asn1-x509';
import { AsnParser } from '@peculiar/asn1-schema';
import {
  row, objectToRows, rowGroup,
} from '../rows_format';
import type { RenderRow } from '../rows_format';
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

  private subtreeToRows(subtree: { base: unknown; minimum?: unknown; maximum?: unknown }): RenderRow[] {
    const baseObj = GeneralNameParser.toObject(subtree.base) as Record<string, unknown>;
    const rows = objectToRows(baseObj);

    if (subtree.minimum !== undefined) {
      rows.push(row('Minimum', subtree.minimum.toString()));
    }

    if (subtree.maximum !== undefined) {
      rows.push(row('Maximum', subtree.maximum.toString()));
    }

    return rows;
  }

  public override toJSON() {
    const rows: RenderRow[] = [
      row('Critical', this.critical),
    ];

    if (this.value.excludedSubtrees?.length) {
      rows.push(rowGroup('Excluded Subtrees', this.value.excludedSubtrees.map((s) => this.subtreeToRows(s))));
    }

    if (this.value.permittedSubtrees?.length) {
      rows.push(rowGroup('Permitted Subtrees', this.value.permittedSubtrees.map((s) => this.subtreeToRows(s))));
    }

    return rowGroup(this.name, [[
      ...rows,
    ]]);
  }
}

ExtensionFactory.register(id_ce_nameConstraints, NameConstraintsExtension);
