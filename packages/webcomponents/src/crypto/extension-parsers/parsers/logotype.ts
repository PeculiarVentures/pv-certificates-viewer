/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AsnParser } from '@peculiar/asn1-schema';
import {
  LogotypeExtn,
  LogotypeInfo,
  id_pe_logotype,
} from '@peculiar/asn1-x509-logotype';
import type { Extension } from '@peculiar/asn1-x509';
import type {
  IExtensionParser, IParsedExtension, IExtensionNode,
} from '../types';
import { node, section } from '../builders';

function parseLogotypeInfo(info: LogotypeInfo): IExtensionNode[] {
  if (info.direct) {
    const children: IExtensionNode[] = [];

    for (const img of info.direct.image ?? []) {
      children.push(section('Image', [
        node('Media Type', img.imageDetails.mediaType),
        ...img.imageDetails.logotypeURI.map((uri) => node('URI', uri)),
      ]));
    }

    for (const audio of info.direct.audio ?? []) {
      children.push(section('Audio', [
        node('Media Type', audio.audioDetails.mediaType),
        ...audio.audioDetails.logotypeURI.map((uri) => node('URI', uri)),
      ]));
    }

    return children;
  }

  if (info.indirect) {
    return info.indirect.refStructURI.map((uri) => node('Reference URI', uri));
  }

  return [];
}

export class LogotypeParser implements IExtensionParser {
  readonly oids = [id_pe_logotype];

  parse(extension: Extension): IParsedExtension {
    const logotype = AsnParser.parse(extension.extnValue.buffer, LogotypeExtn);
    const children: IExtensionNode[] = [];

    if (logotype.communityLogos?.length) {
      children.push(section('Community Logos', logotype.communityLogos.flatMap(parseLogotypeInfo)));
    }

    if (logotype.issuerLogo != null) {
      children.push(section('Issuer Logo', parseLogotypeInfo(logotype.issuerLogo)));
    }

    if (logotype.subjectLogo != null) {
      children.push(section('Subject Logo', parseLogotypeInfo(logotype.subjectLogo)));
    }

    if (logotype.otherLogos?.length) {
      for (const other of logotype.otherLogos) {
        children.push(section(`Other Logo (${other.logotypeType})`, parseLogotypeInfo(other.info)));
      }
    }

    return {
      oid: extension.extnID,
      critical: extension.critical ?? false,
      children,
    };
  }
}
