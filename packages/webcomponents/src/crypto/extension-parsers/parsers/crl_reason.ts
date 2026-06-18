/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AsnParser } from '@peculiar/asn1-schema';
import {
  CRLReason,
  Extension,
  id_ce_cRLReasons,
} from '@peculiar/asn1-x509';
import type { IExtensionParser, IParsedExtension } from '../types';
import { node } from '../builders';

export class CRLReasonParser implements IExtensionParser {
  readonly oids = [id_ce_cRLReasons];

  parse(extension: Extension): IParsedExtension {
    const reason = AsnParser.parse(extension.extnValue.buffer, CRLReason);

    return {
      oid: extension.extnID,
      critical: extension.critical ?? false,
      children: [node('Reason', reason.toJSON())],
    };
  }
}
