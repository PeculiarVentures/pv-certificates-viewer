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
  id_qt_csp,
  id_qt_unotice,
} from '@peculiar/asn1-x509';
import type {
  IExtensionNode,
  IExtensionParser,
  IParsedExtension,
} from '../types';
import { node, section } from '../builders';

function parseQualifierValue(qualifier: ArrayBuffer, qualifierId: string): IExtensionNode | null {
  if (qualifierId === id_qt_csp) {
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

export class CertificatePoliciesParser implements IExtensionParser {
  readonly oids = [id_ce_certificatePolicies];

  parse(extension: Extension): IParsedExtension {
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
