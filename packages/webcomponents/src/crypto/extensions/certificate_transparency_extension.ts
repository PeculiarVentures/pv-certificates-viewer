/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CertificateTransparency } from '@peculiar/asn1-cert-transparency';
import { AsnParser } from '@peculiar/asn1-schema';
import { BaseExtension } from './base_extension';
import logs from '../../constants/logs';

/**
 * Certificate Transparency Extension
 */
export class CertificateTransparencyExtension extends BaseExtension {
  public static override readonly NAME = 'Certificate Transparency';

  public readonly value: CertificateTransparency;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<CertificateTransparency>(asnExtnValue, CertificateTransparency);
  }

  public override toJSON():
  Record<string, string | number | boolean | Record<string, string | number | boolean | Record<string, string>[]>[]> {
    const signedCertificateTimestamps = this.value.toJSON().map((sct) => ({
      Version: sct.version + 1,
      'Log Key ID': sct.logId,
      'Log Operator': logs[sct.logId] || undefined,
      Timestamp: new Date(sct.timestamp).toUTCString(),
      'Signature Algorithm': `${sct.hashAlgorithm} ${sct.signatureAlgorithm}`.toUpperCase(),
      Signature: sct.signature,
      Extensions: sct.extensions || undefined,
    }));

    return {
      Name: CertificateTransparencyExtension.NAME,
      Critical: this.critical ? 'Yes' : 'No',
      'Signed Certificate Timestamps': signedCertificateTimestamps,
    };
  }
}
