/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Extension } from '@peculiar/asn1-x509';
import {
  MTCCertificationAuthority,
  id_pe_mtcCertificationAuthority_experimental,
} from '@peculiar/asn1-mtc';
import { AsnParser } from '@peculiar/asn1-schema';
import type { IExtensionParser, IParsedExtension } from '../types';
import { getStringByOID } from '../../../utils/get_string_by_oid';
import { node } from '../builders';

export class MTCCertificationAuthorityParser implements IExtensionParser {
  readonly oids = [id_pe_mtcCertificationAuthority_experimental];

  parse(extension: Extension): IParsedExtension {
    const mtc = AsnParser.parse(extension.extnValue.buffer, MTCCertificationAuthority);

    return {
      oid: extension.extnID,
      critical: extension.critical ?? false,
      children: [
        node('Log Hash Algorithm', getStringByOID(mtc.logHash.algorithm, true)),
        node('Signature Algorithm', getStringByOID(mtc.sigAlg.algorithm, true)),
        node('Min Serial', mtc.minSerial.toString()),
        node('Max Serial', mtc.maxSerial.toString()),
      ],
    };
  }
}
