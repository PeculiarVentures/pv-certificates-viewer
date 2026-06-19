/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AsnParser } from '@peculiar/asn1-schema';
import {
  BaseCRLNumber,
  CRLNumber,
  Extension,
  id_ce_cRLNumber,
  id_ce_deltaCRLIndicator,
} from '@peculiar/asn1-x509';
import type { IExtensionParser, IParsedExtension } from '../types';
import { node } from '../builders';

export class CRLNumberParser implements IExtensionParser {
  readonly oids = [id_ce_cRLNumber];

  parse(extension: Extension): IParsedExtension {
    const crlNum = AsnParser.parse(extension.extnValue.buffer, CRLNumber);

    return {
      oid: extension.extnID,
      critical: extension.critical ?? false,
      children: [node('CRL Number', crlNum.value)],
    };
  }
}

export class CRLDeltaIndicatorParser implements IExtensionParser {
  readonly oids = [id_ce_deltaCRLIndicator];

  parse(extension: Extension): IParsedExtension {
    const base = AsnParser.parse(extension.extnValue.buffer, BaseCRLNumber);

    return {
      oid: extension.extnID,
      critical: extension.critical ?? false,
      children: [node('Base CRL Number', base.value)],
    };
  }
}
