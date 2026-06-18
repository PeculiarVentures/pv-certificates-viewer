/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AsnParser } from '@peculiar/asn1-schema';
import {
  CaVersion,
  CertificateTemplate,
  EnrollCertTypeChoice,
  id_caVersion,
  id_certificateTemplate,
  id_enrollCertType,
} from '@peculiar/asn1-x509-microsoft';
import type { Extension } from '@peculiar/asn1-x509';
import type { IExtensionParser, IParsedExtension } from '../types';
import { node, section } from '../builders';

export class CertificateTemplateParser implements IExtensionParser {
  readonly oids = [id_certificateTemplate];

  parse(extension: Extension): IParsedExtension {
    const tpl = AsnParser.parse(extension.extnValue.buffer, CertificateTemplate);
    const children = [
      node('Template ID', tpl.templateID),
    ];

    if (tpl.templateMajorVersion != null) {
      children.push(node('Major Version', tpl.templateMajorVersion));
    }

    if (tpl.templateMinorVersion != null) {
      children.push(node('Minor Version', tpl.templateMinorVersion));
    }

    return {
      oid: extension.extnID,
      critical: extension.critical ?? false,
      children,
    };
  }
}

export class EnrollCertTypeParser implements IExtensionParser {
  readonly oids = [id_enrollCertType];

  parse(extension: Extension): IParsedExtension {
    const ect = AsnParser.parse(extension.extnValue.buffer, EnrollCertTypeChoice);

    return {
      oid: extension.extnID,
      critical: extension.critical ?? false,
      children: [
        node('Template Name', ect.toString()),
      ],
    };
  }
}

export class CaVersionParser implements IExtensionParser {
  readonly oids = [id_caVersion];

  parse(extension: Extension): IParsedExtension {
    const cv = AsnParser.parse(extension.extnValue.buffer, CaVersion);
    const { certificateIndex, keyIndex } = cv.getVersion();

    return {
      oid: extension.extnID,
      critical: extension.critical ?? false,
      children: [
        section('CA Version', [
          node('Certificate Index', certificateIndex),
          node('Key Index', keyIndex),
        ]),
      ],
    };
  }
}
