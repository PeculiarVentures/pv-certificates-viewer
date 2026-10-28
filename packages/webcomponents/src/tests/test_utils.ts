/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { OctetString } from '@peculiar/asn1-schema';
import { Attribute, Extension } from '@peculiar/asn1-x509';
import { toArrayBuffer } from '@peculiar/utils/bytes';
import { hex } from '@peculiar/utils/encoding';

/**
 * Build a minimal Extension object from a raw DER-encoded value hex string.
 * The `valueHex` should be the DER bytes of the extension value (what
 * `AsnParser` would normally read from `extnValue.buffer`).
 */
export function makeExtRaw(oid: string, valueHex: string, critical = false): Extension {
  const ext = new Extension({
    extnID: oid,
    critical,
    extnValue: new OctetString(hex.decode(valueHex)),
  });

  return ext;
}

/**
 * Build a minimal Attribute object from a raw DER-encoded value hex string.
 * The `valueHex` should be the DER bytes of the attribute value (what
 * `AsnParser` would normally read from `attribute.values[0]`).
 */
export function makeAttrRaw(oid: string, valueHex: string): Attribute {
  const attr = new Attribute({
    type: oid,
    values: [toArrayBuffer(hex.decode(valueHex))],
  });

  return attr;
}
