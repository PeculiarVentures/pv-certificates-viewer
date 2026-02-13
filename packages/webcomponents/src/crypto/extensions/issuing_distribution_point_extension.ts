/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { IssuingDistributionPoint } from '@peculiar/asn1-x509';
import { AsnParser } from '@peculiar/asn1-schema';
import { BaseExtension } from './base_extension';
import { GeneralNameParser } from './general_name_parser';

/**
 * Issuing Distribution Point Extension
 */
export class IssuingDistributionPointExtension extends BaseExtension {
  public static override readonly NAME = 'Issuing Distribution Point';

  public readonly value: IssuingDistributionPoint;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<IssuingDistributionPoint>(
      asnExtnValue,
      IssuingDistributionPoint,
    );
  }

  public override toJSON():
  Record<string, string | number | boolean | Record<string, string | number | boolean | Record<string, string>[]>[]> {
    const result: Record<string, string | number | boolean | Record<string, string>[]> = {
      Name: IssuingDistributionPointExtension.NAME,
      Critical: this.critical ? 'Yes' : 'No',
    };

    if (this.value.distributionPoint?.fullName) {
      result['Distribution Point'] = this.value.distributionPoint.fullName.map((gn) =>
        GeneralNameParser.toObject(gn),
      );
    }

    if (this.value.onlySomeReasons) {
      result['Only Some Reasons'] = this.value.onlySomeReasons.toJSON().join(', ');
    }

    if (this.value.indirectCRL) {
      result['Indirect CRL'] = 'Yes';
    }

    if (this.value.onlyContainsUserCerts) {
      result['Only Contains User Certs'] = 'Yes';
    }

    if (this.value.onlyContainsAttributeCerts) {
      result['Only Contains Attribute Certs'] = 'Yes';
    }

    if (this.value.onlyContainsCACerts) {
      result['Only Contains CA Certs'] = 'Yes';
    }

    return result as Record<
      string,
      string | number | boolean | Record<string, Record<string, string>[]>[]
    >;
  }
}
