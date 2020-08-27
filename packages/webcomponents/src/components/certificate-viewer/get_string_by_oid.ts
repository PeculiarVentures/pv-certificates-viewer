/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { OIDs } from '../../constants/oids';

export function getStringByOID(value: string) {
  const oid = OIDs[value];

  if (oid) {
    return `${oid} (${value})`;
  }

  return value;
}
