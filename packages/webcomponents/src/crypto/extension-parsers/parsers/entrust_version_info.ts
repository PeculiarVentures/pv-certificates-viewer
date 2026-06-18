/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AsnParser } from '@peculiar/asn1-schema';
import {
  EntrustVersionInfo,
  Extension,
  id_entrust_entrustVersInfo,
} from '@peculiar/asn1-x509';
import type {
  IExtensionNode, IExtensionParser, IParsedExtension,
} from '../types';
import { node } from '../builders';

export class EntrustVersionInfoParser implements IExtensionParser {
  readonly oids = [id_entrust_entrustVersInfo];

  parse(extension: Extension): IParsedExtension {
    const evi = AsnParser.parse(extension.extnValue.buffer, EntrustVersionInfo);
    const children: IExtensionNode[] = [node('Version', evi.entrustVers)];

    const flags = evi.entrustInfoFlags.toJSON();

    if (flags.length > 0) {
      children.push(node('Flags', flags.join(', ')));
    }

    return {
      oid: extension.extnID,
      critical: extension.critical ?? false,
      children,
    };
  }
}
