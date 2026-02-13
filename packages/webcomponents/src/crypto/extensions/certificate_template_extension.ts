/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CertificateTemplate } from '@peculiar/asn1-x509-microsoft';
import { AsnParser } from '@peculiar/asn1-schema';
import { BaseExtension } from './base_extension';

/**
 * Certificate Template Extension
 */
export class CertificateTemplateExtension extends BaseExtension {
  public static override readonly NAME = 'Certificate Template';

  public readonly value: CertificateTemplate;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<CertificateTemplate>(asnExtnValue, CertificateTemplate);
  }

  public override toJSON(): Record<string, string | number | boolean> {
    return {
      Name: CertificateTemplateExtension.NAME,
      Critical: this.critical ? 'Yes' : 'No',
      'Template ID': this.value.templateID,
      'Template Major Version': this.value.templateMajorVersion,
      'Template Minor Version': this.value.templateMinorVersion,
    };
  }
}
