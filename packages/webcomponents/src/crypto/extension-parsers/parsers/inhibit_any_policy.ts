/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AsnParser } from '@peculiar/asn1-schema';
import {
  Extension,
  id_ce_inhibitAnyPolicy,
  InhibitAnyPolicy,
} from '@peculiar/asn1-x509';
import { BufferSourceConverter } from 'pvtsutils';
import type { IExtensionParser, IParsedExtension } from '../types';
import { node } from '../builders';

function decodeInteger(value: ArrayBuffer): number {
  const bytes = new Uint8Array(BufferSourceConverter.toArrayBuffer(value));
  let result = 0;

  for (const byte of bytes) {
    result = (result << 8) | byte;
  }

  return result >>> 0;
}

export class InhibitAnyPolicyParser implements IExtensionParser {
  readonly oids = [id_ce_inhibitAnyPolicy];

  parse(extension: Extension): IParsedExtension {
    const iap = AsnParser.parse(extension.extnValue.buffer, InhibitAnyPolicy);

    return {
      oid: extension.extnID,
      critical: extension.critical ?? false,
      children: [node('Skip Certs', decodeInteger(iap.value))],
    };
  }
}
