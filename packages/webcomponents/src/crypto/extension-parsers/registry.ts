/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { ExtensionParser } from './types';

export class ExtensionParserRegistry {
  private readonly parsers = new Map<string, ExtensionParser>();

  register(parser: ExtensionParser): void {
    for (const oid of parser.oids) {
      this.parsers.set(oid, parser);
    }
  }

  get(oid: string): ExtensionParser | undefined {
    return this.parsers.get(oid);
  }
}
