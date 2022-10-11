/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';

import {
  X509Certificate,
  X509AttributeCertificate,
  CSR,
  CRL,
} from '../../crypto';
import { l10n } from '../../utils';

import { RowTitle } from './row';

type CertificateType = X509Certificate | X509AttributeCertificate | CSR | CRL;

interface IMiscellaneousProps {
  certificate: CertificateType;
}

export const Miscellaneous: FunctionalComponent<IMiscellaneousProps> = (props) => {
  const { certificate } = props;

  return [
    <RowTitle
      value={l10n.getString('miscellaneous')}
    />,
    <tr>
      <td
        class="vertical_align_middle"
      >
        <peculiar-typography
          color="grey_5"
        >
          {l10n.getString('download')}
          :
        </peculiar-typography>
      </td>
      <td>
        <peculiar-button-split
          onClick={() => certificate.downloadAsPEM()}
          actions={[{
            text: l10n.getString('download.der'),
            onClick: () => certificate.downloadAsDER(),
          }]}
        >
          {l10n.getString('download.pem')}
        </peculiar-button-split>
      </td>
    </tr>,
  ];
};
