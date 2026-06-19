/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AsnParser } from '@peculiar/asn1-schema';
import { Attribute as AsnAttribute } from '@peculiar/asn1-x509';
import {
  id_pkcs9_at_challengePassword,
  ChallengePassword,
  id_pkcs9_at_unstructuredName,
  UnstructuredName,
  id_pkcs9_at_extensionRequest,
  ExtensionRequest,
} from '@peculiar/asn1-pkcs9';
import type { IAttributeParser, IParsedAttribute } from '../types';
import { node, section } from '../../extension-parsers/builders';
import { parseExtension } from '../../extension-parsers';

export class ChallengePasswordParser implements IAttributeParser {
  readonly oids = [id_pkcs9_at_challengePassword];

  parse(attribute: AsnAttribute): IParsedAttribute {
    const cp = AsnParser.parse(attribute.values[0], ChallengePassword);

    return {
      oid: attribute.type,
      children: [node('Value', cp.toString())],
    };
  }
}

export class UnstructuredNameParser implements IAttributeParser {
  readonly oids = [id_pkcs9_at_unstructuredName];

  parse(attribute: AsnAttribute): IParsedAttribute {
    const un = AsnParser.parse(attribute.values[0], UnstructuredName);
    const value = un.utf8String ?? un.ia5String ?? un.toString();

    return {
      oid: attribute.type,
      children: [node('Value', value ?? '')],
    };
  }
}

export class ExtensionRequestParser implements IAttributeParser {
  readonly oids = [id_pkcs9_at_extensionRequest];

  parse(attribute: AsnAttribute): IParsedAttribute {
    const er = AsnParser.parse(attribute.values[0], ExtensionRequest);

    return {
      oid: attribute.type,
      children: [section('Extensions', er.map(parseExtension))],
    };
  }
}
