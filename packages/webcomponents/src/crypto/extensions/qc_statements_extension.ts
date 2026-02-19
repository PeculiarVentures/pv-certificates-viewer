/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  QCStatements,
  id_qcs_pkixQCSyntax_v2,
  SemanticsInformation,
  id_pe_qcStatements,
} from '@peculiar/asn1-x509-qualified';
import {
  id_etsi_qcs_qcType,
  QcType,
  id_etsi_qcs_qcPDS,
  PdsLocations,
  id_etsi_qcs_qcRetentionPeriod,
  QcEuRetentionPeriod,
} from '@peculiar/asn1-x509-qualified-etsi';
import { AsnParser } from '@peculiar/asn1-schema';
import { Convert } from 'pvtsutils';
import { getStringByOID } from '../../utils';
import type { IJsonRenderObject } from '../../components/certificate-details-parts/json_to_html_parser';
import { ExtensionFactory } from './extension_factory';
import { BaseExtension } from './base_extension';

/**
 * QC Statements Extension
 */
export class QCStatementsExtension extends BaseExtension {
  public readonly value: QCStatements;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<QCStatements>(asnExtnValue, QCStatements);
  }

  private parseStatementInfo(
    statementId: string,
    statementInfo?: ArrayBuffer,
  ): Record<string, string | number | boolean | Record<string, string>[]> | string | undefined {
    if (!statementInfo || !statementInfo.byteLength) {
      return undefined;
    }

    if (statementId === id_qcs_pkixQCSyntax_v2) {
      const semanticsInformation = AsnParser.parse(statementInfo, SemanticsInformation);

      return { 'Semantics Identifier': semanticsInformation.semanticsIdentifier };
    }

    if (statementId === id_etsi_qcs_qcType) {
      const qcTypes = AsnParser.parse(statementInfo, QcType);

      return { 'QC Types': qcTypes.map((type) => type).join(', ') };
    }

    if (statementId === id_etsi_qcs_qcRetentionPeriod) {
      const retentionPeriod = AsnParser.parse(statementInfo, QcEuRetentionPeriod);

      return { 'Retention Period': `${retentionPeriod.value} years` };
    }

    if (statementId === id_etsi_qcs_qcPDS) {
      const pdsLocations = AsnParser.parse(statementInfo, PdsLocations);

      return {
        'PDS Locations': pdsLocations.map((location) => ({
          URL: location.url,
          Language: location.language,
        })),
      };
    }

    return Convert.ToHex(statementInfo);
  }

  public override toJSON() {
    const statements = this.value.map((statement) => {
      const obj: Record<string, unknown> = { 'Statement ID': getStringByOID(statement.statementId) };
      const parsedInfo = this.parseStatementInfo(statement.statementId, statement.statementInfo);

      if (parsedInfo !== undefined) {
        if (typeof parsedInfo === 'string') {
          obj.Info = parsedInfo;
        } else {
          Object.assign(obj, parsedInfo as IJsonRenderObject);
        }
      }

      return obj;
    });

    return this.extJson({
      Critical: this.critical,
      Statements: statements,
    });
  }
}

ExtensionFactory.register(id_pe_qcStatements, QCStatementsExtension);
