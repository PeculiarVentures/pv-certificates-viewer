import { AsnProp, AsnPropTypes } from '@peculiar/asn1-schema';

/**
 * Extension OID for CABF organization identifier.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const id_cabforganizationIdentifier = '2.23.140.3.1';

/**
 * Implements ASN.1 enumeration for CABF organization identifier.
 *
 * ```asn
 * CABFOrganizationIdentifier ::= SEQUENCE {
 *  registrationSchemeIdentifier  PrintableString (SIZE(3)),
 *  registrationCountry           PrintableString (SIZE(2)),
 *  registrationStateOrProvince   [0] IMPLICIT PrintableString OPTIONAL (SIZE(0..128)),
 *  registrationReference         UTF8String
 * }
 * ```
 */

export class CabforganizationIdentifier {
  @AsnProp({ type: AsnPropTypes.PrintableString })
  public registrationSchemeIdentifier: string;

  @AsnProp({ type: AsnPropTypes.PrintableString })
  public registrationCountry: string;

  @AsnProp({ type: AsnPropTypes.PrintableString, optional: true })
  public registrationStateOrProvince?: string;

  @AsnProp({ type: AsnPropTypes.Utf8String })
  public registrationReference: string;

  constructor(params: Partial<CabforganizationIdentifier> = {}) {
    Object.assign(this, params);
  }
}
