/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CertificateTemplate, id_certificateTemplate } from '@peculiar/asn1-x509-microsoft';
import { AsnParser } from '@peculiar/asn1-schema';
import { ExtensionFactory } from './extension_factory';
import { BaseExtension } from './base_extension';

/**
 * Certificate Template Extension
 */
export class CertificateTemplateExtension extends BaseExtension {
  public readonly value: CertificateTemplate;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<CertificateTemplate>(asnExtnValue, CertificateTemplate);
  }

  public override toJSON() {
    return {
      [this.name]: {
        Critical: this.critical,
        'Template ID': this.value.templateID,
        'Template Major Version': this.value.templateMajorVersion,
        'Template Minor Version': this.value.templateMinorVersion,
      },
    };
  }
}

ExtensionFactory.register(id_certificateTemplate, CertificateTemplateExtension);
