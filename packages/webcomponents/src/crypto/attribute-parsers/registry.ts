/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { AttributeParser } from './types';

export class AttributeParserRegistry {
  private readonly parsers = new Map<string, AttributeParser>();

  register(parser: AttributeParser): void {
    for (const oid of parser.oids) {
      this.parsers.set(oid, parser);
    }
  }

  get(oid: string): AttributeParser | undefined {
    return this.parsers.get(oid);
  }
}
