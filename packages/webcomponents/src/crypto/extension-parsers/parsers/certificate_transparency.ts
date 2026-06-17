/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AsnParser } from '@peculiar/asn1-schema';
import { Extension } from '@peculiar/asn1-x509';
import {
  CertificateTransparency,
  id_certificateTransparency,
} from '@peculiar/asn1-cert-transparency';
import type { ExtensionParser, ParsedExtension } from '../types';
import { node, section } from '../builders';

export class CertificateTransparencyParser implements ExtensionParser {
  readonly oids = [id_certificateTransparency];

  parse(extension: Extension): ParsedExtension {
    const ct = AsnParser.parse(extension.extnValue.buffer, CertificateTransparency);
    const scts = ct.toJSON();

    return {
      oid: extension.extnID,
      critical: extension.critical ?? false,
      children: [
        section('Timestamps', scts.map((sct) => section('', [
          node('Version', sct.version),
          node('Log ID', sct.logId),
          node('Timestamp', sct.timestamp.toISOString()),
          node('Hash Algorithm', sct.hashAlgorithm),
          node('Signature Algorithm', sct.signatureAlgorithm),
          node('Signature', sct.signature),
          ...(sct.extensions ? [node('Extensions', sct.extensions)] : []),
        ]))),
      ],
    };
  }
}
