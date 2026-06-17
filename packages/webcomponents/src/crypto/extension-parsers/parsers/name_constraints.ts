/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AsnParser } from '@peculiar/asn1-schema';
import {
  Extension,
  GeneralSubtrees,
  id_ce_nameConstraints,
  NameConstraints,
} from '@peculiar/asn1-x509';
import type {
  ExtensionNode,
  ExtensionParser,
  ParsedExtension,
} from '../types';
import { node, section } from '../builders';
import { parseGeneralName } from '../parse_general_name';

function parseSubtrees(subtrees: GeneralSubtrees): ExtensionNode[] {
  return subtrees.map((subtree) => {
    const children: ExtensionNode[] = [parseGeneralName(subtree.base)];

    if (subtree.minimum !== 0) {
      children.push(node('Minimum', subtree.minimum));
    }

    if (subtree.maximum != null) {
      children.push(node('Maximum', subtree.maximum));
    }

    return children;
  }).flat();
}

export class NameConstraintsParser implements ExtensionParser {
  readonly oids = [id_ce_nameConstraints];

  parse(extension: Extension): ParsedExtension {
    const nc = AsnParser.parse(extension.extnValue.buffer, NameConstraints);
    const children: ExtensionNode[] = [];

    if (nc.permittedSubtrees != null) {
      children.push(section('Permitted Subtrees', parseSubtrees(nc.permittedSubtrees)));
    }

    if (nc.excludedSubtrees != null) {
      children.push(section('Excluded Subtrees', parseSubtrees(nc.excludedSubtrees)));
    }

    return {
      oid: extension.extnID,
      critical: extension.critical ?? false,
      children,
    };
  }
}
