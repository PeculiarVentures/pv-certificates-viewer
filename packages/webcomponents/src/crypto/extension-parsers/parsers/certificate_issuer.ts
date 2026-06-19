/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AsnParser } from '@peculiar/asn1-schema';
import {
  CertificateIssuer,
  Extension,
  id_ce_certificateIssuer,
} from '@peculiar/asn1-x509';
import type { IExtensionParser, IParsedExtension } from '../types';
import { parseGeneralName } from '../parse_general_name';

export class CertificateIssuerParser implements IExtensionParser {
  readonly oids = [id_ce_certificateIssuer];

  parse(extension: Extension): IParsedExtension {
    const issuer = AsnParser.parse(extension.extnValue.buffer, CertificateIssuer);

    return {
      oid: extension.extnID,
      critical: extension.critical ?? false,
      children: issuer.map(parseGeneralName),
    };
  }
}
