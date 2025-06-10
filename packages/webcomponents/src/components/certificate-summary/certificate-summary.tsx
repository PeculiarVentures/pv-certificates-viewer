/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { FunctionalComponent, h } from '@stencil/core';
import type { X509Certificate } from '../../crypto';
import { dateShort, l10n } from '../../utils';
import { Typography } from '../typography';

interface ICertificateSummaryProps {
  certificate: X509Certificate;
  showIssuer?: boolean;
}

export const CertificateSummary: FunctionalComponent<ICertificateSummaryProps> = (props) => {
  const {
    certificate,
    showIssuer,
  } = props;

  const renderRow = (name: string | string[], value: string | number) => (
    <tr>
      <td>
        <Typography
          variant="b2"
          color="gray-9"
        >
          {name}
        </Typography>
      </td>
      <td>
        <Typography
          variant="b2"
          color="black"
        >
          {value}
        </Typography>
      </td>
    </tr>
  );

  return (
    <table>
      <tbody>
        {renderRow(
          l10n.getString('subjectName'),
          certificate.subjectToString(),
        )}
        {showIssuer && renderRow(
          l10n.getString('issuerName'),
          certificate.issuerToString(),
        )}

        {renderRow(
          l10n.getString('serialNumber'),
          certificate.serialNumber,
        )}
        {renderRow(
          l10n.getString('version'),
          certificate.version,
        )}
        {renderRow(
          l10n.getString('validity'),
          certificate.validity,
        )}
        {renderRow(
          l10n.getString('issued'),
          dateShort(certificate.notBefore),
        )}
        {renderRow(
          l10n.getString('expired'),
          dateShort(certificate.notAfter),
        )}
      </tbody>
    </table>
  );
};
