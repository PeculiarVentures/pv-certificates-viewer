/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { GeneralName, DisplayText } from '@peculiar/asn1-x509';
import { Convert } from 'pvtsutils';
import { AsnParser } from '@peculiar/asn1-schema';
import { Name } from '../name';
import type { IExtensionNode } from './types';
import { node, section } from './builders';

export function parseGeneralName(gn: GeneralName): IExtensionNode {
  // --- Simple string types (library decodes these directly) ---

  if (gn.uniformResourceIdentifier != null) {
    return node('URI', gn.uniformResourceIdentifier);
  }

  if (gn.dNSName != null) {
    return node('DNS Name', gn.dNSName, 'dNSName');
  }

  if (gn.rfc822Name != null) {
    return node('RFC 822 Name', gn.rfc822Name);
  }

  if (gn.registeredID != null) {
    return node('Registered ID', gn.registeredID);
  }

  // iPAddress: AsnIpConverter already converts the raw bytes to a dotted/colon string
  if (gn.iPAddress != null) {
    return node('IP Address', gn.iPAddress, 'iPAddress');
  }

  // --- Structured types ---

  if (gn.otherName != null) {
    const otherName = AsnParser.parse(gn.otherName.value, DisplayText);

    return section('Other Name', [
      node('Type', gn.otherName.typeId),
      node('Value', otherName.toString()),
    ]);
  }

  if (gn.ediPartyName != null) {
    const children: IExtensionNode[] = [];

    if (gn.ediPartyName.nameAssigner != null) {
      children.push(node('Name Assigner', gn.ediPartyName.nameAssigner.toString()));
    }

    children.push(node('Party Name', gn.ediPartyName.partyName.toString()));

    return section('EDI Party Name', children);
  }

  if (gn.directoryName != null) {
    const attrs = Name.parse(gn.directoryName);

    return section('Directory Name', attrs.map((attr) => (
      node(attr.type, attr.value)
    )));
  }

  // x400Address: opaque ORAddress bytes → hex
  if (gn.x400Address != null) {
    return node('X400 Address', Convert.ToHex(gn.x400Address));
  }

  return node('Unknown', '');
}
