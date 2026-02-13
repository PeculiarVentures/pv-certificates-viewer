/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CertificateIssuer } from '@peculiar/asn1-x509';
import { AsnParser } from '@peculiar/asn1-schema';
import { GeneralNameParser } from './general_name_parser';
import { BaseExtension } from './base_extension';

/**
 * Certificate Issuer Extension
 */
export class CertificateIssuerExtension extends BaseExtension {
  public static override readonly NAME = 'Certificate Issuer';

  public readonly value: CertificateIssuer;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<CertificateIssuer>(asnExtnValue, CertificateIssuer);
  }

  public override toJSON():
  Record<string, string | number | boolean | Record<string, string | number | boolean | Record<string, string>[]>[]> {
    const issuers = this.value.map((generalName) => GeneralNameParser.toObject(generalName));

    return {
      Name: CertificateIssuerExtension.NAME,
      Critical: this.critical ? 'Yes' : 'No',
      Issuers: issuers,
    };
  }
}
