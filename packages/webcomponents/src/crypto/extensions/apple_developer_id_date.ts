import { Utf8String, GeneralizedTime } from 'asn1js';

/**
 * Extension OID for Apple Developer ID date extension.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const id_appleDeveloperIdDate = '1.2.840.113635.100.6.1.33';

/**
 * Implements ASN.1 schema for Apple Developer ID date extension.
 *
 * ```asn
 * AppleDeveloperIdDate ::= UTF8String
 * ```
 */

export class AppleDeveloperIdDate {
  #buffer: ArrayBuffer;

  public date: string;

  public fromASN(asn: Utf8String): this {
    this.#buffer = asn.valueBlock.valueHex;

    this.date = new GeneralizedTime({ value: asn.valueBlock.value })
      .toDate()
      .toISOString();

    return this;
  }

  public toASN(): Utf8String {
    return new Utf8String({ valueHex: this.#buffer });
  }

  public toSchema(name: string): Utf8String {
    return new Utf8String({ name });
  }
}
