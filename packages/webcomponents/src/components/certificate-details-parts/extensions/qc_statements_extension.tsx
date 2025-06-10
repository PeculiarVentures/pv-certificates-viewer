/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import {
  QCStatements,
  id_qcs_pkixQCSyntax_v2,
  SemanticsInformation,
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
import { getStringByOID } from '../../../utils';
import { Extension } from '../../../crypto/extension';
import { RowValue, TableRowTable } from '../row';
import { BasicExtension } from './basic_extension';

// eslint-disable-next-line @typescript-eslint/naming-convention
interface IQCStatementsExtensionProps {
  extension: Extension<QCStatements>;
}

export const QCStatementsExtension: FunctionalComponent<IQCStatementsExtensionProps> = (props) => {
  const { extension } = props;

  function renderStatementInfo(statementId: string, statementInfo: ArrayBuffer) {
    if (!statementInfo.byteLength) {
      return null;
    }

    if (statementId === id_qcs_pkixQCSyntax_v2) {
      const semanticsInformation = AsnParser.parse(statementInfo, SemanticsInformation);

      return (
        <RowValue
          name="Semantics Identifier"
          value={getStringByOID(semanticsInformation.semanticsIdentifier)}
        />
      );
    }

    if (statementId === id_etsi_qcs_qcType) {
      const qcTypes = AsnParser.parse(statementInfo, QcType);

      return (
        <RowValue
          name="QC Types"
          value={qcTypes.map((type) => getStringByOID(type)).join(', ')}
        />
      );
    }

    if (statementId === id_etsi_qcs_qcRetentionPeriod) {
      const retentionPeriod = AsnParser.parse(statementInfo, QcEuRetentionPeriod);

      return (
        <RowValue
          name="Retention Period"
          value={`${retentionPeriod.value} years`}
        />
      );
    }

    if (statementId === id_etsi_qcs_qcPDS) {
      const pdsLocations = AsnParser.parse(statementInfo, PdsLocations);

      return ([
        <RowValue
          name="PDS Locations"
          value=""
        />,
        pdsLocations.map((location) => (
          <TableRowTable>
            <RowValue
              name="URL"
              value={location.url}
            />
            <RowValue
              name="Language"
              value={location.language}
            />
          </TableRowTable>
        )),
      ]);
    }

    return (
      <RowValue
        name="Info"
        value={Convert.ToHex(statementInfo)}
        monospace
      />
    );
  }

  return (
    <BasicExtension
      extension={extension}
    >
      {Boolean(extension.value.length) && ([
        <RowValue
          name="Statements"
          value=""
        />,
        extension.value.map((statement) => (
          <TableRowTable>
            <RowValue
              name="Statement ID"
              value={getStringByOID(statement.statementId)}
            />
            {renderStatementInfo(statement.statementId, statement.statementInfo)}
          </TableRowTable>
        )),
      ])}
    </BasicExtension>
  );
};
