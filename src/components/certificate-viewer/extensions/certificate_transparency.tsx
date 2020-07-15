import { h } from '@stencil/core';
import { CertificateTransparency } from '@peculiar/asn1-cert-transparency';

import * as dateFormatter from '../../../utils/date_formatter';
import { Extension } from '../../../crypto/extension';
import { rowValue } from '../row_value';
import logs from '../../../constants/logs';

import { basic } from './basic';

export function certificateTransparency(extension: Extension, value: CertificateTransparency) {
  return basic(
    extension,
    value.toJSON().map(signedCertificateTimestamp => ([
      rowValue(
        'SCT Version',
        signedCertificateTimestamp.version + 1,
      ),
      rowValue(
        'Log Operator',
        logs[signedCertificateTimestamp.logId] || signedCertificateTimestamp.logId,
      ),
      rowValue(
        'Log Key ID',
        signedCertificateTimestamp.logId,
      ),
      rowValue(
        'Timestamp',
        dateFormatter.short(signedCertificateTimestamp.timestamp),
      ),
      rowValue(
        'Signature Algorithm',
        `${signedCertificateTimestamp.hashAlgorithm} ${signedCertificateTimestamp.signatureAlgorithm}`.toUpperCase(),
      ),
      rowValue(
        'Signature',
        signedCertificateTimestamp.signature,
        { monospace: true },
      ),
      <tr>
        <td />
        <td />
      </tr>,
    ])),
  );
}
