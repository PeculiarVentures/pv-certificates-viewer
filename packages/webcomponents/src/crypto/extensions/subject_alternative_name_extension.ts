/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { SubjectAlternativeName, id_ce_subjectAltName } from '@peculiar/asn1-x509';
import { AsnParser } from '@peculiar/asn1-schema';
import type { IJsonRenderObject } from '../../components/certificate-details-parts/json_to_html_parser';
import { ExtensionFactory } from './extension_factory';
import { BaseExtension } from './base_extension';
import { GeneralNameParser } from './general_name_parser';

/**
 * Subject Alternative Name Extension
 */
export class SubjectAlternativeNameExtension extends BaseExtension {
  public readonly value: SubjectAlternativeName;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<SubjectAlternativeName>(asnExtnValue, SubjectAlternativeName);
  }

  public override toJSON() {
    const names = this.value.map((generalName) => {
      const obj = GeneralNameParser.toObject(generalName) as Record<string, unknown>;

      if (Object.keys(obj).length === 1) {
        const [[k, v]] = Object.entries(obj);

        if (typeof v === 'string' || typeof v === 'number') {
          return { [k]: v };
        }
      }

      return { Name: obj as IJsonRenderObject };
    });

    return {
      [this.name]: {
        Critical: this.critical,
        Names: names,
      },
    };
  }
}

ExtensionFactory.register(id_ce_subjectAltName, SubjectAlternativeNameExtension);
