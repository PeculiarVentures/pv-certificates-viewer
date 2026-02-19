/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CRLDistributionPoints, id_ce_cRLDistributionPoints } from '@peculiar/asn1-x509';
import { AsnParser } from '@peculiar/asn1-schema';
import { ExtensionFactory } from './extension_factory';
import { BaseExtension } from './base_extension';
import { GeneralNameParser } from './general_name_parser';

/**
 * CRL Distribution Points Extension
 */
export class CRLDistributionPointsExtension extends BaseExtension {
  public readonly value: CRLDistributionPoints;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<CRLDistributionPoints>(asnExtnValue, CRLDistributionPoints);
  }

  public override toJSON() {
    const distributionPoints = this.value.map((point) => {
      const obj: Record<string, unknown> = {};

      if (point.distributionPoint?.fullName?.length) {
        obj['Distribution Point'] = point.distributionPoint.fullName.map(
          (gn) => GeneralNameParser.toObject(gn),
        );
      }

      if (point.cRLIssuer?.length) {
        obj['CRL Issuer'] = point.cRLIssuer.map(
          (gn) => GeneralNameParser.toObject(gn),
        );
      }

      return obj;
    });

    return this.extJson({
      Critical: this.critical,
      'Distribution Points': distributionPoints,
    });
  }
}

ExtensionFactory.register(id_ce_cRLDistributionPoints, CRLDistributionPointsExtension);
ExtensionFactory.register('2.5.29.46', CRLDistributionPointsExtension);
