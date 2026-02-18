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
import { row, objectToRows, rowGroup } from '../rows_format';

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
    const dpRows = this.value.map((point) => {
      const rows = [];

      if (point.distributionPoint?.fullName?.length) {
        rows.push(rowGroup('Distribution Point', point.distributionPoint.fullName.map(
          (gn) => objectToRows(GeneralNameParser.toObject(gn) as Record<string, unknown>),
        )));
      }

      if (point.cRLIssuer?.length) {
        rows.push(rowGroup('CRL Issuer', point.cRLIssuer.map(
          (gn) => objectToRows(GeneralNameParser.toObject(gn) as Record<string, unknown>),
        )));
      }

      return rows;
    }).flat();

    return rowGroup(this.name, [[
      row('Critical', this.critical),
      ...dpRows,
    ]]);
  }
}

ExtensionFactory.register(id_ce_cRLDistributionPoints, CRLDistributionPointsExtension);
ExtensionFactory.register('2.5.29.46', CRLDistributionPointsExtension);
