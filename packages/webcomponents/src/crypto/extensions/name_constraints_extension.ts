/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { NameConstraints } from '@peculiar/asn1-x509';
import { AsnParser } from '@peculiar/asn1-schema';
import { BaseExtension } from './base_extension';
import { GeneralNameParser } from './general_name_parser';

/**
 * Name Constraints Extension
 */
export class NameConstraintsExtension extends BaseExtension {
  public static override readonly NAME = 'Name Constraints';

  public readonly value: NameConstraints;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<NameConstraints>(asnExtnValue, NameConstraints);
  }

  public override toJSON():
  Record<string, string | number | boolean | Record<string, string | number | boolean | Record<string, string>[]>[]> {
    const result: Record<string, string | number | boolean | Record<string, string>[]> = {
      Name: NameConstraintsExtension.NAME,
      Critical: this.critical ? 'Yes' : 'No',
    };

    if (this.value.excludedSubtrees && this.value.excludedSubtrees.length > 0) {
      result['Excluded Subtrees'] = this.value.excludedSubtrees.map((subtree) => {
        const subtreeData: Record<string, string> = GeneralNameParser.toObject(subtree.base);
        if (subtree.minimum !== undefined) {
          subtreeData.Minimum = subtree.minimum.toString();
        }
        if (subtree.maximum !== undefined) {
          subtreeData.Maximum = subtree.maximum.toString();
        }
        return subtreeData;
      });
    }

    if (this.value.permittedSubtrees && this.value.permittedSubtrees.length > 0) {
      result['Permitted Subtrees'] = this.value.permittedSubtrees.map((subtree) => {
        const subtreeData: Record<string, string> = GeneralNameParser.toObject(subtree.base);
        if (subtree.minimum !== undefined) {
          subtreeData.Minimum = subtree.minimum.toString();
        }
        if (subtree.maximum !== undefined) {
          subtreeData.Maximum = subtree.maximum.toString();
        }
        return subtreeData;
      });
    }

    return result as Record<string, string | number | boolean | Record<string, string | number | boolean | Record<string, string>[]>[]>;
  }
}
