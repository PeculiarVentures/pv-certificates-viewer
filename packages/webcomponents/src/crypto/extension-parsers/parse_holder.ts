/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { type Holder, DigestedObjectType } from '@peculiar/asn1-x509-attr';
import { hex } from '@peculiar/utils/encoding';
import type { IExtensionNode } from './types';
import { node, section } from './builders';
import { parseGeneralName } from './parse_general_name';

export function parseHolder(holder: Holder): IExtensionNode[] {
  const nodes: IExtensionNode[] = [];
  const { baseCertificateID, entityName, objectDigestInfo } = holder;

  if (baseCertificateID) {
    const { issuer, serial, issuerUID } = baseCertificateID;

    const children: IExtensionNode[] = [
      section('Issuer', [...issuer].map(parseGeneralName)),
      node('Serial Number', hex.encode(serial)),
    ];

    if (issuerUID && (issuerUID as ArrayBuffer).byteLength > 0) {
      children.push(node('Issuer UID', hex.encode(issuerUID)));
    }

    nodes.push(section('Base Certificate ID', children));
  }

  if (entityName) {
    nodes.push(section('Entity Name', [...entityName].map(parseGeneralName)));
  }

  if (objectDigestInfo) {
    const { digestedObjectType, digestAlgorithm, objectDigest, otherObjectTypeID } =
      objectDigestInfo;

    const children: IExtensionNode[] = [
      node('Type', DigestedObjectType[digestedObjectType]),
      node('Algorithm', digestAlgorithm.algorithm),
      node('Digest', hex.encode(objectDigest)),
    ];

    if (otherObjectTypeID) {
      children.push(node('Other Type ID', otherObjectTypeID));
    }

    nodes.push(section('Digest Info', children));
  }

  return nodes;
}
