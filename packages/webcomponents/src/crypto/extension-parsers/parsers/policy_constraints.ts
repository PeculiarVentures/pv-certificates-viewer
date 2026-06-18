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
  id_ce_policyConstraints,
  PolicyConstraints,
} from '@peculiar/asn1-x509';
import { BufferSourceConverter } from 'pvtsutils';
import type {
  IExtensionNode, IExtensionParser, IParsedExtension,
} from '../types';
import { node } from '../builders';

/**
 * Decode a big-endian unsigned integer from the raw bytes that
 * `@peculiar/asn1-x509` exposes for SkipCerts (typed as ArrayBuffer but
 * actually a Uint8Array at runtime).
 */
function decodeSkipCerts(value: ArrayBuffer): number {
  const bytes = new Uint8Array(BufferSourceConverter.toArrayBuffer(value));
  let result = 0;

  for (const byte of bytes) {
    result = (result << 8) | byte;
  }

  return result >>> 0; // treat as unsigned 32-bit
}

export class PolicyConstraintsParser implements IExtensionParser {
  readonly oids = [id_ce_policyConstraints];

  parse(extension: Extension): IParsedExtension {
    const pc = AsnParser.parse(extension.extnValue.buffer, PolicyConstraints);
    const children: IExtensionNode[] = [];

    if (pc.requireExplicitPolicy != null) {
      children.push(node('Require Explicit Policy', decodeSkipCerts(pc.requireExplicitPolicy)));
    }

    if (pc.inhibitPolicyMapping != null) {
      children.push(node('Inhibit Policy Mapping', decodeSkipCerts(pc.inhibitPolicyMapping)));
    }

    return {
      oid: extension.extnID,
      critical: extension.critical ?? false,
      children,
    };
  }
}
