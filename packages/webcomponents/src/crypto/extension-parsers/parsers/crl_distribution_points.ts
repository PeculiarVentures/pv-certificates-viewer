/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AsnParser } from '@peculiar/asn1-schema';
import {
  CRLDistributionPoints,
  Extension,
  id_ce_cRLDistributionPoints,
} from '@peculiar/asn1-x509';
import type {
  ExtensionParser,
  ParsedExtension,
} from '../types';
import { section } from '../builders';
import { parseGeneralName } from '../parse_general_name';

export class CRLDistributionPointsParser implements ExtensionParser {
  // '2.16.724.1.2.2.4.1' is an alias used by some Spanish certs; same encoding
  readonly oids = [id_ce_cRLDistributionPoints, '2.5.29.46'];

  parse(extension: Extension): ParsedExtension {
    const points = AsnParser.parse(extension.extnValue.buffer, CRLDistributionPoints);

    return {
      oid: extension.extnID,
      critical: extension.critical ?? false,
      children: [
        section('Distribution Points', points.map((point) => section('', [
          ...(point.distributionPoint?.fullName ?? []).map((gn) => parseGeneralName(gn)),
          ...(point.cRLIssuer ?? []).map((gn) => parseGeneralName(gn)),
        ]))),
      ],
    };
  }
}
