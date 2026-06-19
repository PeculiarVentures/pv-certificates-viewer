/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AsnParser } from '@peculiar/asn1-schema';
import type { Extension } from '@peculiar/asn1-x509';
import type { IExtensionParser, IParsedExtension } from '../types';
import { node, section } from '../builders';
import {
  CabforganizationIdentifier,
  id_cabforganizationIdentifier,
} from '../../extensions/cabforganization_identifier';
import {
  AppleDeveloperIdDate,
  id_appleDeveloperIdDate,
} from '../../extensions/apple_developer_id_date';

export class CabfOrganizationIdentifierParser implements IExtensionParser {
  readonly oids = [id_cabforganizationIdentifier];

  parse(extension: Extension): IParsedExtension {
    const cabf = AsnParser.parse(extension.extnValue.buffer, CabforganizationIdentifier);
    const children = [
      node('Scheme', cabf.registrationSchemeIdentifier),
      node('Country', cabf.registrationCountry),
    ];

    if (cabf.registrationStateOrProvince != null) {
      children.push(node('State Or Province', cabf.registrationStateOrProvince));
    }

    children.push(node('Reference', cabf.registrationReference));

    return {
      oid: extension.extnID,
      critical: extension.critical ?? false,
      children: [section('Organization Identifier', children)],
    };
  }
}

export class AppleDeveloperIdDateParser implements IExtensionParser {
  readonly oids = [id_appleDeveloperIdDate];

  parse(extension: Extension): IParsedExtension {
    const dateExt = AsnParser.parse(extension.extnValue.buffer, AppleDeveloperIdDate);

    return {
      oid: extension.extnID,
      critical: extension.critical ?? false,
      children: [
        node('Date', dateExt.date),
      ],
    };
  }
}
