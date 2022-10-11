/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { RevokedCertificate } from '@peculiar/asn1-x509';
import { h, FunctionalComponent } from '@stencil/core';
import { Convert } from 'pvtsutils';

import { dateShort, l10n } from '../../utils';

import { RowTitle, RowValue } from '../certificate-viewer/row';

interface IRevokedCertificatesProps {
  certificates: RevokedCertificate[];
}

export const RevokedCertificates: FunctionalComponent<IRevokedCertificatesProps> = (props) => {
  const {
    certificates,
  } = props;

  return [
    <RowTitle
      value={l10n.getString('revokedCertificates')}
    />,
    certificates.map((certificate) => ([
      <RowValue
        name={l10n.getString('serialNumber')}
        value={Convert.ToHex(certificate.userCertificate)}
        monospace
      />,
      <RowValue
        name={l10n.getString('revocation')}
        value={dateShort(certificate.revocationDate.getTime())}
      />,
      <tr>
        <td colSpan={2} class="divider">
          <span class="bg_fill" />
        </td>
      </tr>,
    ])),
  ];
};
