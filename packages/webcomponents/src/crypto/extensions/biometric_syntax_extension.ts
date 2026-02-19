/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { BiometricSyntax, id_pe_biometricInfo } from '@peculiar/asn1-x509-qualified';
import { AsnParser } from '@peculiar/asn1-schema';
import { Convert } from 'pvtsutils';
import { OIDs } from '../../constants/oids';
import { ExtensionFactory } from './extension_factory';
import { BaseExtension } from './base_extension';

/**
 * Biometric Syntax Extension
 */
export class BiometricSyntaxExtension extends BaseExtension {
  public readonly value: BiometricSyntax;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<BiometricSyntax>(asnExtnValue, BiometricSyntax);
  }

  public override toJSON() {
    const biometrics = this.value.map((data) => {
      const obj: Record<string, string | number> = {};

      if (data.typeOfBiometricData.biometricDataOid) {
        const oid = OIDs[data.typeOfBiometricData.biometricDataOid];

        obj.OID = oid ? `${oid} (${data.typeOfBiometricData.biometricDataOid})` : data.typeOfBiometricData.biometricDataOid;
      }

      if (data.typeOfBiometricData.predefinedBiometricType !== undefined) {
        obj.Type = data.typeOfBiometricData.predefinedBiometricType;
      }

      const algorithmOid = OIDs[data.hashAlgorithm.algorithm];

      obj.Algorithm = algorithmOid ? `${algorithmOid} (${data.hashAlgorithm.algorithm})` : data.hashAlgorithm.algorithm;
      obj.Hash = Convert.ToHex(data.biometricDataHash.buffer);
      if (data.sourceDataUri) obj['Source Uri'] = data.sourceDataUri;

      return obj;
    });

    return {
      [this.name]: {
        Critical: this.critical,
        Biometrics: biometrics,
      },
    };
  }
}

ExtensionFactory.register(id_pe_biometricInfo, BiometricSyntaxExtension);
ExtensionFactory.register('2.16.724.1.2.2.4.1', BiometricSyntaxExtension);
