/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import { Convert } from 'pvtsutils';
import { dateShort, l10n } from '../../utils';
import { IRevokedCertificate } from '../../crypto';
import { ParsedExtensions } from '../parsed-extensions-viewer/parsed-extensions-viewer';
import {
  RowTitle, RowValue, TableRowTable,
} from './row';

interface IRevokedCertificatesProps {
  revokedCertificates: IRevokedCertificate[];
}

export const RevokedCertificates: FunctionalComponent<IRevokedCertificatesProps> = (props) => {
  const { revokedCertificates } = props;

  if (!revokedCertificates || !revokedCertificates.length) {
    return null;
  }

  return [
    <RowTitle
      value={l10n.getString('revokedCertificates')}
    />,
    revokedCertificates.map((certificate) => ([
      <RowValue
        name={l10n.getString('serialNumber')}
        value={Convert.ToHex(certificate.userCertificate)}
        monospace
      />,
      <RowValue
        name={l10n.getString('revocationDate')}
        value={dateShort(certificate.revocationDate.getTime())}
      />,
      (certificate.crlEntryExtensions && certificate.crlEntryExtensions.length && ([
        <RowValue
          name={l10n.getString('crlEntryExtensions')}
          value=""
        />,
        <TableRowTable>
          <ParsedExtensions
            title=""
            extensions={certificate.crlEntryExtensions}
          />
        </TableRowTable>,
      ])),
      <tr>
        <td colSpan={2} class="divider">
          <span />
        </td>
      </tr>,
    ])),
  ];
};
