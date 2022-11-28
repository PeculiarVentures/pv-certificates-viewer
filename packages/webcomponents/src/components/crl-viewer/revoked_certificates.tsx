/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import { CRLReason, InvalidityDate } from '@peculiar/asn1-x509';
import { Convert } from 'pvtsutils';

import { dateShort, l10n } from '../../utils';
import { IRevokedCertificate } from '../../crypto';
import { getStringByOID } from '../certificate-viewer/get_string_by_oid';

import { RowTitle, RowValue } from '../certificate-viewer/row';

interface IRevokedCertificatesProps {
  revokedCertificates: IRevokedCertificate[];
}

export const RevokedCertificates: FunctionalComponent<IRevokedCertificatesProps> = (props) => {
  const {
    revokedCertificates,
  } = props;

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
          name={`${l10n.getString('crlEntryExtensions')}:`}
          value=""
        />,
        certificate.crlEntryExtensions.map((extension) => {
          if (extension.value instanceof CRLReason) {
            return (
              <RowValue
                name={getStringByOID(extension.asn.extnID)}
                value={extension.value.toJSON() || extension.value.reason}
              />
            );
          }

          if (extension.value instanceof InvalidityDate) {
            return (
              <RowValue
                name={getStringByOID(extension.asn.extnID)}
                value={extension.value.value.getTime()}
              />
            );
          }

          return (
            <RowValue
              name={getStringByOID(extension.asn.extnID)}
              value={Convert.ToHex(extension.asn.extnValue)}
              monospace
            />
          );
        }),
      ])),
      <tr>
        <td colSpan={2} class="divider">
          <span class="bg_fill" />
        </td>
      </tr>,
    ])),
  ];
};
