/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Extension } from '@peculiar/asn1-x509';
import type { IParsedExtension } from './types';
import type { ExtensionParserRegistry } from './registry';
import { parseUnknown } from './unknown';

export function parseExtension(
  extension: Extension,
  registry: ExtensionParserRegistry,
): IParsedExtension {
  const parser = registry.get(extension.extnID);

  if (!parser) {
    return parseUnknown(extension);
  }

  try {
    return parser.parse(extension);
  } catch (error) {
    console.warn('Error parsing extension:', extension.extnID, error);

    return parseUnknown(extension);
  }
}
