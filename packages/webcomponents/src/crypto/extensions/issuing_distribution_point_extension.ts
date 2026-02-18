/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { IssuingDistributionPoint, id_ce_issuingDistributionPoint } from '@peculiar/asn1-x509';
import { AsnParser } from '@peculiar/asn1-schema';
import { ExtensionFactory } from './extension_factory';
import { BaseExtension } from './base_extension';
import { GeneralNameParser } from './general_name_parser';
import { row, rowGroup, objectToRows } from '../rows_format';

/**
 * Issuing Distribution Point Extension
 */
export class IssuingDistributionPointExtension extends BaseExtension {
  public readonly value: IssuingDistributionPoint;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<IssuingDistributionPoint>(
      asnExtnValue,
      IssuingDistributionPoint,
    );
  }

  public override toJSON() {
    const rows = [row('Critical', this.critical)];

    if (this.value.distributionPoint?.fullName?.length) {
      rows.push(rowGroup('Distribution Point', [this.value.distributionPoint.fullName.flatMap(
        (gn) => objectToRows(GeneralNameParser.toObject(gn) as Record<string, unknown>),
      )]));
    }
    if (this.value.onlySomeReasons) {
      rows.push(row('Only Some Reasons', this.value.onlySomeReasons.toJSON().join(', ')));
    }
    if (this.value.indirectCRL) rows.push(row('Indirect CRL', 'Yes'));
    if (this.value.onlyContainsUserCerts) rows.push(row('Only Contains User Certs', 'Yes'));
    if (this.value.onlyContainsAttributeCerts) rows.push(row('Only Contains Attribute Certs', 'Yes'));
    if (this.value.onlyContainsCACerts) rows.push(row('Only Contains CA Certs', 'Yes'));

    return rowGroup(this.name, [rows]);
  }
}

ExtensionFactory.register(id_ce_issuingDistributionPoint, IssuingDistributionPointExtension);
