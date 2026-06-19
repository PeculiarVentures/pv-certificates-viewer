/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Attribute as AsnAttribute, Extension } from '@peculiar/asn1-x509';

export type TPrimitive = string | number | boolean;

export type TExtensionNodeType
  = | 'dNSName'
    | 'iPAddress'
    | 'authorityKeyId'
    | 'subjectKeyId'
    | 'lei';

export interface IExtensionNode {
  title?: string;
  value?: TPrimitive;
  children?: IExtensionNode[];
  _type?: TExtensionNodeType;
}

export interface IParsedExtension {
  oid: string;
  critical: boolean;
  children: IExtensionNode[];
}

export interface IExtensionParser {
  oids: string[];
  parse(extension: Extension): IParsedExtension;
}

export interface IParsedAttribute {
  oid: string;
  children: (IExtensionNode | IParsedExtension)[];
}

export interface IAttributeParser {
  oids: string[];
  parse(attribute: AsnAttribute): IParsedAttribute;
}
