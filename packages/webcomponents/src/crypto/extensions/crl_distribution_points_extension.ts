/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CRLDistributionPoints } from '@peculiar/asn1-x509';
import { AsnParser } from '@peculiar/asn1-schema';
import { BaseExtension } from './base_extension';
import { GeneralNameParser } from './general_name_parser';

/**
 * CRL Distribution Points Extension
 */
export class CRLDistributionPointsExtension extends BaseExtension {
  public static override readonly NAME = 'CRL Distribution Points';

  public readonly value: CRLDistributionPoints;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<CRLDistributionPoints>(asnExtnValue, CRLDistributionPoints);
  }

  public override toJSON():
  Record<string, string | number | boolean | Record<string, string | number | boolean | Record<string, string>[]>[]> {
    type TDistributionPointData = Record<string, Record<string, string>[]>;
    const distributionPoints = this.value.map((point) => {
      const pointData: TDistributionPointData = {};

      if (point.distributionPoint?.fullName) {
        pointData['Distribution Point'] = point.distributionPoint.fullName.map((gn) => GeneralNameParser.toObject(gn));
      }

      if (point.cRLIssuer && point.cRLIssuer.length > 0) {
        pointData['CRL Issuer'] = point.cRLIssuer.map((gn) => GeneralNameParser.toObject(gn));
      }

      return pointData;
    });

    return {
      Name: CRLDistributionPointsExtension.NAME,
      Critical: this.critical ? 'Yes' : 'No',
      'Distribution Points': distributionPoints,
    };
  }
}
