/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import { hex } from '@peculiar/utils/encoding';
import { IRevokedCertificate } from '../../../crypto';
import { dateShort } from '../../../utils';
import { ParsedExtensions } from '../parsed/extensions';
import { RowTitle, RowValue, TableRowTable } from './row';

interface IRevokedCertificatesProps {
  revokedCertificates: IRevokedCertificate[];
}

export const RevokedCertificates: FunctionalComponent<IRevokedCertificatesProps> = (props) => {
  const { revokedCertificates } = props;

  if (!revokedCertificates || !revokedCertificates.length) {
    return null;
  }

  return [
    <RowTitle value="Revoked Certificates" />,
    revokedCertificates.map((certificate) => [
      <RowValue
        name="Serial Number"
        value={hex.encode(certificate.userCertificate)}
        monospace
      />,
      <RowValue
        name="Revocation Date"
        value={dateShort(certificate.revocationDate.getTime())}
      />,
      certificate.crlEntryExtensions &&
        certificate.crlEntryExtensions.length && [
          <RowValue
            name="CRL Entry Extensions"
            value=""
          />,
          <TableRowTable>
            <ParsedExtensions
              title=""
              extensions={certificate.crlEntryExtensions}
            />
          </TableRowTable>,
        ],
      <tr>
        <td
          colSpan={2}
          class="divider"
        >
          <span />
        </td>
      </tr>,
    ]),
  ];
};
