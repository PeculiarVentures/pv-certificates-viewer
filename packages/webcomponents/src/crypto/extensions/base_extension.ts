/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Extension } from '@peculiar/asn1-x509';
import { AsnData } from '../asn_data';
import { getStringByOID } from '../../utils/get_string_by_oid';
import type { IJsonRenderObject } from '../../components/certificate-details-parts/json_to_html_parser';

/**
 * Base class for all extension types.
 * Display name is derived from OID: "OIDs[oid] (extnID)" so the same extension
 * class can show different names when registered for multiple OIDs.
 */
export abstract class BaseExtension extends AsnData<Extension> {
  constructor(raw: BufferSource) {
    super(raw, Extension);
  }

  public get critical(): string {
    return this.asn.critical ? 'YES' : 'NO';
  }

  /** Display name based on OID: "OIDs[oid] (oid)" when in OIDs map, else the OID string. */
  public get name(): string {
    return getStringByOID(this.asn.extnID);
  }

  /** Returns { [this.name]: content } for JsonToHtmlParser (TJsonRenderFormat section value). */
  public abstract toJSON(): IJsonRenderObject;

  /** Build extension JSON with correct typing. Use for content that may have Record<string, unknown> values. */
  protected extJson(content: Record<string, unknown>): IJsonRenderObject {
    return { [this.name]: content } as IJsonRenderObject;
  }
}
