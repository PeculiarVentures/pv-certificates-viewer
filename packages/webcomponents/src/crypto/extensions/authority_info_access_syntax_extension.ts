/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AuthorityInfoAccessSyntax, id_pe_authorityInfoAccess } from '@peculiar/asn1-x509';
import { AsnParser } from '@peculiar/asn1-schema';
import { getStringByOID } from '../../utils';
import { ExtensionFactory } from './extension_factory';
import { BaseExtension } from './base_extension';
import { GeneralNameParser } from './general_name_parser';

/**
 * Authority Info Access Syntax Extension
 */
export class AuthorityInfoAccessSyntaxExtension extends BaseExtension {
  public readonly value: AuthorityInfoAccessSyntax;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<AuthorityInfoAccessSyntax>(asnExtnValue, AuthorityInfoAccessSyntax);
  }

  public override toJSON() {
    const descriptions = this.value.map((description) => {
      const locationObj = GeneralNameParser.toObject(description.accessLocation) as Record<string, unknown>;

      return {
        Method: getStringByOID(description.accessMethod),
        ...locationObj,
      };
    });

    return {
      [this.name]: {
        Critical: this.critical,
        Descriptions: descriptions,
      },
    };
  }
}

ExtensionFactory.register(id_pe_authorityInfoAccess, AuthorityInfoAccessSyntaxExtension);
