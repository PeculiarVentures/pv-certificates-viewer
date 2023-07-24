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
import { Button } from '../button';
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
      <td>
        <Button
          onClick={() => certificate.downloadAsPEM()}
          startIcon={(
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="none"
            >
              <path
                fill="var(--pv-color-secondary)"
                d="M21 12h-2c-.6 0-1 .4-1 1s.4 1 1 1h2c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H9c-.6 0-1-.4-1-1v-7c0-.6.4-1 1-1h2c.6 0 1-.4 1-1s-.4-1-1-1H9c-1.7 0-3 1.3-3 3v7c0 1.7 1.3 3 3 3h12c1.7 0 3-1.3 3-3v-7c0-1.7-1.3-3-3-3Zm-9.7 5.7 3 3c.2.2.4.3.7.3.3 0 .5-.1.7-.3l3-3c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0L16 17.6V6c0-.6-.4-1-1-1s-1 .4-1 1v11.6l-1.3-1.3c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4Z"
              />
            </svg>
          )}
        >
          {l10n.getString('download.pem')}
        </Button>
      </td>
    </tr>,
    <tr>
      <td>
        <Button
          onClick={() => certificate.downloadAsDER()}
          startIcon={(
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="none"
            >
              <path
                fill="var(--pv-color-secondary)"
                d="M21 12h-2c-.6 0-1 .4-1 1s.4 1 1 1h2c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H9c-.6 0-1-.4-1-1v-7c0-.6.4-1 1-1h2c.6 0 1-.4 1-1s-.4-1-1-1H9c-1.7 0-3 1.3-3 3v7c0 1.7 1.3 3 3 3h12c1.7 0 3-1.3 3-3v-7c0-1.7-1.3-3-3-3Zm-9.7 5.7 3 3c.2.2.4.3.7.3.3 0 .5-.1.7-.3l3-3c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0L16 17.6V6c0-.6-.4-1-1-1s-1 .4-1 1v11.6l-1.3-1.3c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4Z"
              />
            </svg>
          )}
        >
          {l10n.getString('download.der')}
        </Button>
      </td>
    </tr>,
  ];
};
