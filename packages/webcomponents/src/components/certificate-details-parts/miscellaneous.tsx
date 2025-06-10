/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import {
  X509Certificates,
  X509Certificate,
  X509AttributeCertificate,
  Pkcs10CertificateRequest,
  X509Crl,
} from '../../crypto';
import { l10n } from '../../utils';
import { Button } from '../button';
import { DownloadIcon } from '../icons';
import { RowTitle } from './row';

type TCertificateType = X509Certificates
  | X509Certificate
  | X509AttributeCertificate
  | Pkcs10CertificateRequest
  | X509Crl;

interface IMiscellaneousProps {
  certificate: TCertificateType;
}

export const Miscellaneous: FunctionalComponent<IMiscellaneousProps> = (props) => {
  const { certificate } = props;

  return [
    <RowTitle
      value={l10n.getString('miscellaneous')}
    />,
    <tr>
      <td>
        <Button
          startIcon={<DownloadIcon />}
          onClick={() => certificate.downloadAsPEM()}
        >
          {l10n.getString('download.pem')}
        </Button>
      </td>
    </tr>,
    <tr>
      <td>
        <Button
          startIcon={<DownloadIcon />}
          onClick={() => certificate.downloadAsDER()}
        >
          {l10n.getString('download.der')}
        </Button>
      </td>
    </tr>,
  ];
};
