/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { BiometricSyntax } from '@peculiar/asn1-x509-qualified';
import { AsnParser } from '@peculiar/asn1-schema';
import { Convert } from 'pvtsutils';
import { OIDs } from '../../constants/oids';
import { BaseExtension } from './base_extension';

/**
 * Biometric Syntax Extension
 */
export class BiometricSyntaxExtension extends BaseExtension {
  public static override readonly NAME = 'Biometric Syntax';

  public readonly value: BiometricSyntax;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<BiometricSyntax>(asnExtnValue, BiometricSyntax);
  }

  public override toJSON():
  Record<string, string | number | boolean | Record<string, string | number | boolean | Record<string, string>[]>[]> {
    const biometrics = this.value.map((data) => {
      const biometricData: Record<string, string | number> = {};

      if (data.typeOfBiometricData.biometricDataOid) {
        const oid = OIDs[data.typeOfBiometricData.biometricDataOid];
        biometricData.OID = oid ? `${oid} (${data.typeOfBiometricData.biometricDataOid})` : data.typeOfBiometricData.biometricDataOid;
      }

      if (data.typeOfBiometricData.predefinedBiometricType !== undefined) {
        biometricData.Type = data.typeOfBiometricData.predefinedBiometricType;
      }

      const algorithmOid = OIDs[data.hashAlgorithm.algorithm];
      biometricData.Algorithm = algorithmOid ? `${algorithmOid} (${data.hashAlgorithm.algorithm})` : data.hashAlgorithm.algorithm;
      biometricData.Hash = Convert.ToHex(data.biometricDataHash.buffer);

      if (data.sourceDataUri) {
        biometricData['Source Uri'] = data.sourceDataUri;
      }

      return biometricData;
    });

    return {
      Name: BiometricSyntaxExtension.NAME,
      Critical: this.critical ? 'Yes' : 'No',
      Biometrics: biometrics,
    };
  }
}
