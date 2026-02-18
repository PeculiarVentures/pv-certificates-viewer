/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Extension as AsnExtension } from '@peculiar/asn1-x509';
import { AsnData } from '../asn_data';
import { getStringByOID } from '../../utils/get_string_by_oid';
import type { RenderRow } from '../rows_format';

/**
 * Base class for all extension types.
 * Display name is derived from OID: "OIDs[extnID] (extnID)" so the same extension
 * class can show different names when registered for multiple OIDs.
 */
export abstract class BaseExtension extends AsnData<AsnExtension> {
  constructor(raw: BufferSource) {
    super(raw, AsnExtension);
  }

  public get critical(): string {
    return this.asn.critical ? 'YES' : 'NO';
  }

  /** Display name based on OID: "OIDs[oid] (oid)" when in OIDs map, else the OID string. */
  public get name(): string {
    return getStringByOID(this.asn.extnID);
  }

  /** Returns a section RenderRow for this extension (name + $rows) */
  public abstract toJSON(): RenderRow;
}
