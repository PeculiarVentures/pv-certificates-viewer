/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AsnParser } from '@peculiar/asn1-schema';
import { Extension } from '@peculiar/asn1-x509';
import {
  id_pe_qcStatements,
  id_qcs_pkixQCSyntax_v2,
  QCStatements,
  SemanticsInformation,
} from '@peculiar/asn1-x509-qualified';
import {
  id_etsi_qcs_qcType,
  id_etsi_qcs_qcPDS,
  id_etsi_qcs_qcRetentionPeriod,
  QcType,
  QcEuRetentionPeriod,
  PdsLocations,
} from '@peculiar/asn1-x509-qualified-etsi';
import { Convert } from 'pvtsutils';
import { OIDs } from '../../../constants/oids';
import type {
  IExtensionNode,
  IExtensionParser,
  IParsedExtension,
} from '../types';
import { node, section } from '../builders';
import { parseGeneralName } from '../parse_general_name';

function parseStatementInfo(statementId: string, statementInfo?: ArrayBuffer): IExtensionNode[] {
  if (!statementInfo || !statementInfo.byteLength) {
    return [];
  }

  try {
    if (statementId === id_qcs_pkixQCSyntax_v2) {
      const si = AsnParser.parse(statementInfo, SemanticsInformation);
      const children: IExtensionNode[] = [];

      if (si.semanticsIdentifier) {
        children.push(node('Semantics Identifier', si.semanticsIdentifier));
      }

      for (const gn of si.nameRegistrationAuthorities ?? []) {
        children.push(parseGeneralName(gn));
      }

      return children;
    }

    if (statementId === id_etsi_qcs_qcType) {
      const types = AsnParser.parse(statementInfo, QcType);

      return [node('QC Types', Array.from(types).map((oid) => OIDs[oid] ?? oid).join(', '))];
    }

    if (statementId === id_etsi_qcs_qcRetentionPeriod) {
      const period = AsnParser.parse(statementInfo, QcEuRetentionPeriod);

      return [node('Retention Period', `${period.value} years`)];
    }

    if (statementId === id_etsi_qcs_qcPDS) {
      const locations = AsnParser.parse(statementInfo, PdsLocations);

      return [
        section('PDS Locations', locations.map((loc) => section('', [
          node('URL', loc.url),
          node('Language', loc.language),
        ]))),
      ];
    }
  } catch {
    // fall through
  }

  return [node('Info', Convert.ToHex(statementInfo))];
}

export class QCStatementsParser implements IExtensionParser {
  readonly oids = [id_pe_qcStatements];

  parse(extension: Extension): IParsedExtension {
    const stmts = AsnParser.parse(extension.extnValue.buffer, QCStatements);

    return {
      oid: extension.extnID,
      critical: extension.critical ?? false,
      children: [
        section('Statements', stmts.map((stmt) => section('', [
          node('Statement', stmt.statementId),
          ...parseStatementInfo(stmt.statementId, stmt.statementInfo),
        ]))),
      ],
    };
  }
}
