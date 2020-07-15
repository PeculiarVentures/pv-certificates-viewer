import { QCStatements } from '@peculiar/asn1-x509-qualified';

import { rowValue } from '../row_value';
import { Extension } from '../../../crypto/extension';
import { getStringByOID } from '../get_string_by_oid';

import { basic } from './basic';

export function qcStatements(extension: Extension, value: QCStatements) {
  return basic(
    extension,
    value.map((statement, index) => (
      rowValue(
        `Statement #${index + 1}`,
        getStringByOID(statement.statementId),
      )
    )),
  );
}
