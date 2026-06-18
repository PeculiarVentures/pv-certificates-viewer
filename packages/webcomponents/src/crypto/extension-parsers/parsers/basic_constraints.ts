/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AsnParser } from '@peculiar/asn1-schema';
import {
  BasicConstraints,
  Extension,
  id_ce_basicConstraints,
} from '@peculiar/asn1-x509';
import type { IExtensionParser, IParsedExtension } from '../types';
import { node } from '../builders';

export class BasicConstraintsParser implements IExtensionParser {
  readonly oids = [id_ce_basicConstraints];

  parse(extension: Extension): IParsedExtension {
    const bc = AsnParser.parse(extension.extnValue.buffer, BasicConstraints);

    const children = [node('CA', bc.cA ?? false)];

    if (bc.pathLenConstraint !== undefined) {
      children.push(node('Path Length Constraint', bc.pathLenConstraint));
    }

    return {
      oid: extension.extnID,
      critical: extension.critical ?? false,
      children,
    };
  }
}
