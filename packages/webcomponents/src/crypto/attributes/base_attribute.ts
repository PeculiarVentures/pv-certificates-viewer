/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Attribute } from '@peculiar/asn1-x509';
import { AsnData } from '../asn_data';
import { getStringByOID } from '../../utils/get_string_by_oid';
import type { IJsonRenderObject } from '../../components/certificate-details-parts/json_to_html_parser';

/**
 * Base class for all attribute types.
 * Display name is derived from OID via getStringByOID.
 */
export abstract class BaseAttribute extends AsnData<Attribute> {
  public static readonly NAME: string;

  constructor(raw: BufferSource) {
    super(raw, Attribute);
  }

  /** Display name based on OID: "OIDs[oid] (oid)" when in OIDs map, else the OID string. */
  public get name(): string {
    return getStringByOID(this.asn.type);
  }

  /** Returns { [this.name]: content } for JsonToHtmlParser (TJsonRenderFormat section value). */
  public abstract toJSON(): IJsonRenderObject;

  /** Build attribute JSON with correct typing. Use for content that may have Record<string, unknown> values. */
  protected attrJson(content: Record<string, unknown>): IJsonRenderObject {
    return { [this.name]: content } as IJsonRenderObject;
  }
}
