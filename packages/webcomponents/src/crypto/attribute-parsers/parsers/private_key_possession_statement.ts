/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AsnConvert, AsnParser } from '@peculiar/asn1-schema';
import { Attribute as AsnAttribute } from '@peculiar/asn1-x509';
import {
  id_at_statementOfPossession,
  PrivateKeyPossessionStatement,
} from '@peculiar/asn1-private-key-stmt';
import { Convert } from 'pvtsutils';
import type {
  AttributeParser, ExtensionNode, ParsedAttribute,
} from '../types';
import { node, section } from '../../extension-parsers/builders';
import { Name } from '../../name';

export class PrivateKeyPossessionStatementParser implements AttributeParser {
  readonly oids = [id_at_statementOfPossession];

  parse(attribute: AsnAttribute): ParsedAttribute {
    const pks = AsnParser.parse(attribute.values[0], PrivateKeyPossessionStatement);
    const children: ExtensionNode[] = [];

    children.push(node('Serial Number', Convert.ToHex(pks.signer.serialNumber)));

    const issuerAttrs = new Name(pks.signer.issuer).toJSON();

    children.push(section('Issuer', issuerAttrs.map((a) => node(a.name ?? a.type, a.value))));

    if (pks.cert) {
      children.push(node('Certificate', Convert.ToBase64(AsnConvert.serialize(pks.cert))));
    }

    return {
      oid: attribute.type, children,
    };
  }
}
