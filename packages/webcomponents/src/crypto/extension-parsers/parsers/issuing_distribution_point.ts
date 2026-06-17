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
  id_ce_issuingDistributionPoint,
  IssuingDistributionPoint,
} from '@peculiar/asn1-x509';
import type {
  ExtensionNode, ExtensionParser, ParsedExtension,
} from '../types';
import { node, section } from '../builders';
import { parseGeneralName } from '../parse_general_name';

export class IssuingDistributionPointParser implements ExtensionParser {
  readonly oids = [id_ce_issuingDistributionPoint];

  parse(extension: Extension): ParsedExtension {
    const idp = AsnParser.parse(extension.extnValue.buffer, IssuingDistributionPoint);
    const children: ExtensionNode[] = [];

    if (idp.distributionPoint != null) {
      const dpChildren: ExtensionNode[] = [];

      for (const gn of idp.distributionPoint.fullName ?? []) {
        dpChildren.push(parseGeneralName(gn));
      }

      if (idp.distributionPoint.nameRelativeToCRLIssuer != null) {
        for (const atv of idp.distributionPoint.nameRelativeToCRLIssuer) {
          dpChildren.push(node(atv.type, atv.value.toString()));
        }
      }

      children.push(section('Distribution Point', dpChildren));
    }

    if (idp.onlyContainsUserCerts) {
      children.push(node('Only Contains User Certs', true));
    }

    if (idp.onlyContainsCACerts) {
      children.push(node('Only Contains CA Certs', true));
    }

    if (idp.onlySomeReasons != null) {
      const reasons = idp.onlySomeReasons.toJSON();

      if (reasons.length > 0) {
        children.push(node('Only Some Reasons', reasons.join(', ')));
      }
    }

    if (idp.indirectCRL) {
      children.push(node('Indirect CRL', true));
    }

    if (idp.onlyContainsAttributeCerts) {
      children.push(node('Only Contains Attribute Certs', true));
    }

    return {
      oid: extension.extnID,
      critical: extension.critical ?? false,
      children,
    };
  }
}
