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
  Pkcs10CertificateRequest,
  X509Crl,
} from '../../crypto';
import { l10n } from '../../utils';
import { Button } from '../button';
import { DownloadIcon } from '../icons';
import { RowTitle } from './row';

type CertificateType = X509Certificate
| X509AttributeCertificate
| Pkcs10CertificateRequest
| X509Crl;

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
      <td>
        <Button
          onClick={() => certificate.downloadAsPEM()}
          startIcon={<DownloadIcon />}
        >
          {l10n.getString('download.pem')}
        </Button>
      </td>
    </tr>,
    <tr>
      <td>
        <Button
          onClick={() => certificate.downloadAsDER()}
          startIcon={<DownloadIcon />}
        >
          {l10n.getString('download.der')}
        </Button>
      </td>
    </tr>,
  ];
};
