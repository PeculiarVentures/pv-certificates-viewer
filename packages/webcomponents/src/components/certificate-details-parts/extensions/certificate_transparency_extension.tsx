/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import type { CertificateTransparency } from '@peculiar/asn1-cert-transparency';
import type { Extension } from '../../../crypto/extension';
import logs from '../../../constants/logs';
import { dateShort } from '../../../utils';
import { RowValue, TableRowTable } from '../row';
import { BasicExtension } from './basic_extension';

interface ICertificateTransparencyExtensionProps {
  extension: Extension<CertificateTransparency>;
}

export const CertificateTransparencyExtension:
FunctionalComponent<ICertificateTransparencyExtensionProps> = (props) => {
  const { extension } = props;

  return (
    <BasicExtension
      extension={extension}
    >
      {Boolean(extension.value.items.length) && ([
        <RowValue
          name="Signed Certificate Timestamps"
          value=""
        />,
        extension.value.toJSON().map((signedCertificateTimestamp) => (
          <TableRowTable>
            <RowValue
              name="Version"
              value={signedCertificateTimestamp.version + 1}
            />
            <RowValue
              name="Log Operator"
              value={logs[signedCertificateTimestamp.logId] || signedCertificateTimestamp.logId}
            />
            <RowValue
              name="Log Key ID"
              value={signedCertificateTimestamp.logId}
              monospace
            />
            <RowValue
              name="Timestamp"
              value={dateShort(signedCertificateTimestamp.timestamp)}
            />
            <RowValue
              name="Signature Algorithm"
              value={`${signedCertificateTimestamp.hashAlgorithm} ${signedCertificateTimestamp.signatureAlgorithm}`.toUpperCase()}
            />
            <RowValue
              name="Signature"
              value={signedCertificateTimestamp.signature}
              monospace
            />
            <RowValue
              name="Extensions"
              value={signedCertificateTimestamp.extensions || undefined}
              monospace
            />
          </TableRowTable>
        )),
      ])}
    </BasicExtension>
  );
};
