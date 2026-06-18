/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Attribute as AsnAttribute, Extension } from '@peculiar/asn1-x509';

export type Primitive = string | number | boolean;

export type ExtensionNodeType
  = | 'dNSName'
    | 'iPAddress'
    | 'authorityKeyId'
    | 'subjectKeyId'
    | 'lei';

export interface ExtensionNode {
  title?: string;
  value?: Primitive;
  children?: ExtensionNode[];
  _type?: ExtensionNodeType;
}

export interface ParsedExtension {
  oid: string;
  critical: boolean;
  children: ExtensionNode[];
}

export interface ExtensionParser {
  oids: string[];
  parse(extension: Extension): ParsedExtension;
}

export interface ParsedAttribute {
  oid: string;
  children: (ExtensionNode | ParsedExtension)[];
}

export interface AttributeParser {
  oids: string[];
  parse(attribute: AsnAttribute): ParsedAttribute;
}
