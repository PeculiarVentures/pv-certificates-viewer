/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AsnParser } from '@peculiar/asn1-schema';
import {
  CertificatePolicies,
  DisplayText,
  Extension,
  UserNotice,
  id_ce_certificatePolicies,
} from '@peculiar/asn1-x509';
import type {
  ExtensionNode,
  ExtensionParser,
  ParsedExtension,
} from '../types';
import { node, section } from '../builders';

const id_qt_cps = '1.3.6.1.5.5.7.2.1';
const id_qt_unotice = '1.3.6.1.5.5.7.2.2';

function parseQualifierValue(qualifier: ArrayBuffer, qualifierId: string): ExtensionNode | null {
  if (qualifierId === id_qt_cps) {
    try {
      return node('Value', AsnParser.parse(qualifier, DisplayText).toString());
    } catch {
      return null;
    }
  }

  if (qualifierId === id_qt_unotice) {
    try {
      const userNotice = AsnParser.parse(qualifier, UserNotice);

      if (userNotice.explicitText != null) {
        return node('Value', userNotice.explicitText.toString());
      }
    } catch {
      return null;
    }
  }

  return null;
}

export class CertificatePoliciesParser implements ExtensionParser {
  readonly oids = [id_ce_certificatePolicies];

  parse(extension: Extension): ParsedExtension {
    const policies = AsnParser.parse(extension.extnValue.buffer, CertificatePolicies);

    return {
      oid: extension.extnID,
      critical: extension.critical ?? false,
      children: [
        section('Policies', policies.map((policy) => section('', [
          node('Policy', policy.policyIdentifier),
          ...policy.policyQualifiers?.length
            ? [
                section('Qualifiers', policy.policyQualifiers.map((qualifier) => section('', [
                  node('Qualifier', qualifier.policyQualifierId),
                  parseQualifierValue(qualifier.qualifier, qualifier.policyQualifierId),
                ]))),
              ]
            : [],
        ]))),
      ],
    };
  }
}
