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
  BiometricSyntax,
  id_pe_biometricInfo,
  PredefinedBiometricType,
} from '@peculiar/asn1-x509-qualified';
import { Convert } from 'pvtsutils';
import type {
  ExtensionNode, ExtensionParser, ParsedExtension,
} from '../types';
import { node, section } from '../builders';

const BIOMETRIC_TYPE_LABELS: Record<number, string> = {
  [PredefinedBiometricType.picture]: 'Picture',
  [PredefinedBiometricType.handwrittenSignature]: 'Handwritten Signature',
};

export class BiometricInfoParser implements ExtensionParser {
  readonly oids = [id_pe_biometricInfo, '2.16.724.1.2.2.4.1'];

  parse(extension: Extension): ParsedExtension {
    const bio = AsnParser.parse(extension.extnValue.buffer, BiometricSyntax);

    return {
      oid: extension.extnID,
      critical: extension.critical ?? false,
      children: [
        section('Biometrics', bio.map((data) => {
          const children: ExtensionNode[] = [];

          const { predefinedBiometricType, biometricDataOid } = data.typeOfBiometricData;

          if (predefinedBiometricType != null) {
            children.push(node('Type', BIOMETRIC_TYPE_LABELS[predefinedBiometricType] ?? String(predefinedBiometricType)));
          } else if (biometricDataOid) {
            children.push(node('OID', biometricDataOid));
          }

          children.push(node('Hash Algorithm', data.hashAlgorithm.algorithm));
          children.push(node('Hash', Convert.ToHex(data.biometricDataHash)));

          if (data.sourceDataUri != null) {
            children.push(node('Source URI', data.sourceDataUri));
          }

          return section('', children);
        })),
      ],
    };
  }
}
