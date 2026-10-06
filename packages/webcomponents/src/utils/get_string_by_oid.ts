/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { id_alg_mtcProof, id_rdna_trustAnchorID } from '@peculiar/asn1-mtc';
import { OIDs } from '../constants/oids';

const mtcOIDs: Record<string, string> = {
  [id_alg_mtcProof]: 'MTC Proof',
  [id_rdna_trustAnchorID]: 'Trust Anchor ID',
};

/** Get display name for OID. Format: "label (oid)" when found, else the raw OID. */
export function getStringByOID(value: string, onlyLabel = false): string {
  const label = mtcOIDs[value] || OIDs[value];

  if (onlyLabel) {
    return label || value;
  }

  if (label) {
    return `${label} (${value})`;
  }

  return value;
}
