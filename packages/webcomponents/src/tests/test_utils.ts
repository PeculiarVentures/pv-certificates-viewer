/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Attribute, Extension } from '@peculiar/asn1-x509';
import { Convert } from 'pvtsutils';

/**
 * Build a minimal Extension object from a raw DER-encoded value hex string.
 * The `valueHex` should be the DER bytes of the extension value (what
 * `AsnParser` would normally read from `extnValue.buffer`).
 */
export function makeExtRaw(oid: string, valueHex: string, critical = false): Extension {
  const ext = new Extension();

  ext.extnID = oid;
  ext.critical = critical;
  ext.extnValue = { buffer: Convert.FromHex(valueHex) } as any;

  return ext;
}

/**
 * Build a minimal Attribute object from a raw DER-encoded value hex string.
 * The `valueHex` should be the DER bytes of the attribute value (what
 * `AsnParser` would normally read from `attribute.values[0]`).
 */
export function makeAttrRaw(oid: string, valueHex: string): Attribute {
  const attr = new Attribute();

  attr.type = oid;
  attr.values = [Convert.FromHex(valueHex)];

  return attr;
}
