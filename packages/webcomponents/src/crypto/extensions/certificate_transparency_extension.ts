/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CertificateTransparency, id_certificateTransparency } from '@peculiar/asn1-cert-transparency';
import { AsnParser } from '@peculiar/asn1-schema';
import logs from '../../constants/logs';
import { ExtensionFactory } from './extension_factory';
import { BaseExtension } from './base_extension';

/**
 * Certificate Transparency Extension
 */
export class CertificateTransparencyExtension extends BaseExtension {
  public readonly value: CertificateTransparency;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<CertificateTransparency>(asnExtnValue, CertificateTransparency);
  }

  public override toJSON() {
    const scts = this.value.toJSON().map((sct) => {
      const obj: Record<string, string | number> = {
        Version: sct.version + 1,
        'Log Key ID': sct.logId,
        Timestamp: new Date(sct.timestamp).toUTCString(),
        'Signature Algorithm': `${sct.hashAlgorithm} ${sct.signatureAlgorithm}`.toUpperCase(),
        Signature: sct.signature,
      };

      if (logs[sct.logId]) obj['Log Operator'] = logs[sct.logId];
      if (sct.extensions) obj.Extensions = typeof sct.extensions === 'string' ? sct.extensions : JSON.stringify(sct.extensions);

      return obj;
    });

    return {
      [this.name]: {
        Critical: this.critical,
        'Signed Certificate Timestamps': scts,
      },
    };
  }
}

ExtensionFactory.register(id_certificateTransparency, CertificateTransparencyExtension);
