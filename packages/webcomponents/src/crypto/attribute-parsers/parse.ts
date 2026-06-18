/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Attribute as AsnAttribute } from '@peculiar/asn1-x509';
import type { ParsedAttribute } from './types';
import type { AttributeParserRegistry } from './registry';
import { parseUnknownAttribute } from './unknown';

export function parseAttribute(
  attribute: AsnAttribute,
  registry: AttributeParserRegistry,
): ParsedAttribute {
  const parser = registry.get(attribute.type);

  if (!parser) {
    return parseUnknownAttribute(attribute);
  }

  try {
    return parser.parse(attribute);
  } catch {
    return parseUnknownAttribute(attribute);
  }
}
