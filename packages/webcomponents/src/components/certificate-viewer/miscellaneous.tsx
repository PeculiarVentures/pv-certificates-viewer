/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';

import { X509Certificate, X509AttributeCertificate, CSR } from '../../crypto';
import { Download } from '../../utils/download';

import { RowTitle } from './row';

type CertificateType = X509Certificate | X509AttributeCertificate | CSR;

function downloadCertificateAsPem(certificate: CertificateType) {
  if (certificate instanceof CSR) {
    Download.certificateRequest.asPEM(
      certificate.exportAsPemFormatted(),
      certificate.commonName,
    );
  } else {
    Download.certificate.asPEM(
      certificate.exportAsPemFormatted(),
      certificate.commonName,
    );
  }
}

function downloadCertificateAsDer(certificate: CertificateType) {
  if (certificate instanceof CSR) {
    Download.certificateRequest.asDER(
      certificate.exportAsHexFormatted(),
      certificate.commonName,
    );
  } else {
    Download.certificate.asDER(
      certificate.exportAsHexFormatted(),
      certificate.commonName,
    );
  }
}

interface IMiscellaneousProps {
  certificate: CertificateType;
}

export const Miscellaneous: FunctionalComponent<IMiscellaneousProps> = (props) => {
  const { certificate } = props;

  return [
    <RowTitle
      value="Miscellaneous"
    />,
    <tr>
      <td
        class="vertical_align_middle"
      >
        <peculiar-typography
          color="grey_5"
        >
          Download:
        </peculiar-typography>
      </td>
      <td>
        <peculiar-button-split
          onClick={downloadCertificateAsPem.bind(this, certificate)}
          actions={[{
            text: 'Download DER',
            onClick: downloadCertificateAsDer.bind(this, certificate),
          }]}
        >
          Download PEM
        </peculiar-button-split>
      </td>
    </tr>,
  ];
};
