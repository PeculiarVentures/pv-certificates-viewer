import { GeneralizedTime } from 'asn1js';

/**
 * Extension OID for Microsoft CRL Next Publish extension.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const id_msCRLNextPublish = '1.3.6.1.4.1.311.21.4';

/**
 * Implements ASN.1 schema for Microsoft CRL Next Publish extension.
 *
 * ```asn
 * MsCRLNextPublish ::= GeneralizedTime
 * ```
 */
export class MsCRLNextPublish {
  #buffer: ArrayBuffer;

  public nextPublish: string;

  public fromASN(asn: GeneralizedTime): this {
    this.#buffer = asn.valueBlock.valueHex;
    this.nextPublish = asn.toDate().toISOString();

    return this;
  }

  public toASN(): GeneralizedTime {
    return new GeneralizedTime({ valueHex: this.#buffer });
  }

  public toSchema(name: string): GeneralizedTime {
    return new GeneralizedTime({ name });
  }
}
