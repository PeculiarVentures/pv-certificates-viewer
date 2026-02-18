/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { OIDs } from '../constants/oids';

/** Get display name for OID. Format: "OIDs[oid] (oid)" when found, else the raw OID. */
export function getStringByOID(value: string, onlyLabel = false): string {
  const label = OIDs[value];

  if (onlyLabel) {
    return label || value;
  }

  if (label) {
    return `${label} (${value})`;
  }

  return value;
}
