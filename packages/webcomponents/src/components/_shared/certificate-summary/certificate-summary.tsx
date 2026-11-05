/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { FunctionalComponent, h } from '@stencil/core';
import type { X509Certificate } from '../../../crypto';
import { dateShort } from '../../../utils';
import { Typography } from '../typography';

interface ICertificateSummaryProps {
  certificate: X509Certificate;
  showIssuer?: boolean;
}

export const CertificateSummary: FunctionalComponent<ICertificateSummaryProps> = (props) => {
  const { certificate, showIssuer } = props;

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
        {renderRow('Subject Name', certificate.subjectToString())}
        {showIssuer && renderRow('Issuer Name', certificate.issuerToString())}

        {renderRow('Serial Number', certificate.serialNumber)}
        {renderRow('Version', certificate.version)}
        {renderRow('Validity', certificate.validity)}
        {renderRow('Issued', dateShort(certificate.notBefore))}
        {renderRow('Expired', dateShort(certificate.notAfter))}
      </tbody>
    </table>
  );
};
