/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { toUint8Array } from '@peculiar/utils/bytes';

/**
 * Decodes UTF-8 bytes. Malformed bytes throw (callers fall back to HEX) and a leading BOM is
 * kept, as with `Convert.ToString` from pvtsutils; `utf8.decode` from `@peculiar/utils`
 * would replace them with U+FFFD and drop the BOM.
 */
export function decodeUtf8(data: BufferSource): string {
  return new TextDecoder('utf-8', { fatal: true, ignoreBOM: true }).decode(toUint8Array(data));
}
