import { h, FunctionalComponent } from '@stencil/core';
import { CertificateTransparency } from '@peculiar/asn1-cert-transparency';

import { RowValue } from '../row';
import { Extension } from '../../../crypto/extension';
import logs from '../../../constants/logs';
import * as dateFormatter from '../../../utils/date_formatter';

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
      {extension.value.toJSON().map((signedCertificateTimestamp) => ([
        <RowValue
          name="SCT Version"
          value={signedCertificateTimestamp.version + 1}
        />,
        <RowValue
          name="Log Operator"
          value={logs[signedCertificateTimestamp.logId] || signedCertificateTimestamp.logId}
        />,
        <RowValue
          name="Log Key ID"
          value={signedCertificateTimestamp.logId}
          monospace
        />,
        <RowValue
          name="Timestamp"
          value={dateFormatter.short(signedCertificateTimestamp.timestamp)}
        />,
        <RowValue
          name="Signature Algorithm"
          value={`${signedCertificateTimestamp.hashAlgorithm} ${signedCertificateTimestamp.signatureAlgorithm}`.toUpperCase()}
        />,
        <RowValue
          name="Signature"
          value={signedCertificateTimestamp.signature}
          monospace
        />,
        <tr>
          <td />
          <td />
        </tr>,
      ]))}
    </BasicExtension>
  );
};
