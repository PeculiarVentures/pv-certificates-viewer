/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { AttCertIssuer } from '@peculiar/asn1-x509-attr';
import type { IExtensionNode } from './types';
import { parseGeneralName } from './parse_general_name';

export function parseIssuer(issuer: AttCertIssuer): IExtensionNode[] {
  if (issuer.v1Form) {
    return issuer.v1Form.map(parseGeneralName);
  }

  if (issuer.v2Form?.issuerName) {
    return [...issuer.v2Form.issuerName].map(parseGeneralName);
  }

  return [];
}
