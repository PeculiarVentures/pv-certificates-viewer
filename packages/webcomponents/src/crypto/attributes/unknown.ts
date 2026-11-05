/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Attribute as AsnAttribute } from '@peculiar/asn1-x509';
import { hex } from '@peculiar/utils/encoding';
import type { IParsedAttribute } from './types';

export function parseUnknownAttribute(attribute: AsnAttribute): IParsedAttribute {
  const raw = attribute.values[0] ? hex.encode(attribute.values[0]) : '';

  return {
    oid: attribute.type,
    children: [
      {
        title: 'Raw Value',
        value: raw,
      },
    ],
  };
}
