/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { PrivateKeyPossessionStatement } from '@peculiar/asn1-private-key-stmt';
import { AsnParser, AsnConvert } from '@peculiar/asn1-schema';
import { Convert } from 'pvtsutils';
import { BaseAttribute } from './base_attribute';

/**
 * Private Key Possession Statement Attribute
 */
export class PrivateKeyPossessionStatementAttribute extends BaseAttribute {
  public static override readonly NAME = 'Private Key Possession Statement';

  public readonly value: PrivateKeyPossessionStatement;

  constructor(raw: BufferSource) {
    super(raw);

    const asnAttrValue = this.asn.values[0];

    this.value = AsnParser.parse<PrivateKeyPossessionStatement>(asnAttrValue, PrivateKeyPossessionStatement);
  }

  public override toJSON():
  Record<string, string | number | boolean | Record<string, string | number | boolean | Record<string, string>[]>[]> {
    const result: Record<string, unknown> = {
      Name: PrivateKeyPossessionStatementAttribute.NAME,
      'Serial Number': Convert.ToHex(this.value.signer.serialNumber),
    };

    if (this.value.signer.issuer) {
      const issuerParts: Record<string, string>[] = [];

      this.value.signer.issuer.forEach((rdn) => {
        rdn.forEach((atv) => {
          const value = atv.value.toString();
          issuerParts.push({ [atv.type]: value });
        });
      });

      result.Issuer = issuerParts;
    }

    if (this.value.cert) {
      result.Certificate = Convert.ToHex(AsnConvert.serialize(this.value.cert));
    }

    return result as Record<
      string,
      string | number | boolean | Record<string, string | number | boolean | Record<string, string>[]>[]
    >;
  }
}
