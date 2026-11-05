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
} from '../../../crypto';
import { Button } from '../button';
import { DownloadIcon } from '../icons';
import { RowTitle } from './row';

type TCertificateType =
  | X509Certificates
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
    <RowTitle value="Miscellaneous" />,
    <tr>
      <td>
        <Button
          startIcon={<DownloadIcon />}
          onClick={() => certificate.downloadAsPEM()}
        >
          {'Download PEM'}
        </Button>
      </td>
    </tr>,
    <tr>
      <td>
        <Button
          startIcon={<DownloadIcon />}
          onClick={() => certificate.downloadAsDER()}
        >
          {'Download DER'}
        </Button>
      </td>
    </tr>,
  ];
};
