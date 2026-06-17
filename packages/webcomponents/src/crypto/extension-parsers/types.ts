/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Extension } from '@peculiar/asn1-x509';

export type Primitive = string | number | boolean;

export interface ExtensionNode {
  title?: string;
  value?: Primitive;
  children?: ExtensionNode[];
}

export interface ParsedExtension {
  oid: string;
  critical: boolean;
  children: ExtensionNode[];
}

export interface ExtensionParser {
  oids: string[];
  parse(extension: Extension): ParsedExtension;
}
