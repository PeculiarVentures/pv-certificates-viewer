/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Convert } from 'pvtsutils';
import type { Attribute as AsnAttribute } from '@peculiar/asn1-x509';
import type { ParsedAttribute } from './types';

export function parseUnknownAttribute(attribute: AsnAttribute): ParsedAttribute {
  const raw = attribute.values[0]
    ? Convert.ToHex(attribute.values[0])
    : '';

  return {
    oid: attribute.type,
    children: [{
      title: 'Raw Value', value: raw,
    }],
  };
}
