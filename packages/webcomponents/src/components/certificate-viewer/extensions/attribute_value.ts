/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Convert } from 'pvtsutils';
import { Attribute } from '@peculiar/asn1-x509';

export function getAttributeValue(attribute: Attribute) {
  return Convert.ToString(attribute.values[0]);
}
