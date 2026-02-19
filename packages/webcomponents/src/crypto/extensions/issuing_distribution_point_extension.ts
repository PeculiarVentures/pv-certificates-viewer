/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { IssuingDistributionPoint, id_ce_issuingDistributionPoint } from '@peculiar/asn1-x509';
import { AsnParser } from '@peculiar/asn1-schema';
import type { IJsonRenderObject } from '../../components/certificate-details-parts/json_to_html_parser';
import { ExtensionFactory } from './extension_factory';
import { BaseExtension } from './base_extension';
import { GeneralNameParser } from './general_name_parser';

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
    const content: Record<string, unknown> = { Critical: this.critical };

    if (this.value.distributionPoint?.fullName?.length) {
      content['Distribution Point'] = this.value.distributionPoint.fullName.map(
        (gn) => GeneralNameParser.toObject(gn) as IJsonRenderObject,
      );
    }

    if (this.value.onlySomeReasons) {
      content['Only Some Reasons'] = this.value.onlySomeReasons.toJSON().join(', ');
    }

    if (this.value.indirectCRL) content['Indirect CRL'] = 'Yes';
    if (this.value.onlyContainsUserCerts) content['Only Contains User Certs'] = 'Yes';
    if (this.value.onlyContainsAttributeCerts) content['Only Contains Attribute Certs'] = 'Yes';
    if (this.value.onlyContainsCACerts) content['Only Contains CA Certs'] = 'Yes';

    return this.extJson(content);
  }
}

ExtensionFactory.register(id_ce_issuingDistributionPoint, IssuingDistributionPointExtension);
