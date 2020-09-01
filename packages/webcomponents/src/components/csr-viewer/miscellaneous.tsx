/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';

import type { CSR } from '../../crypto';
import { Download } from '../../utils/download';
import { RowTitle } from '../certificate-viewer/row';

function downloadCertificateAsPem(certificate: CSR) {
  Download.certificateRequest.asPEM(
    certificate.export('pem'),
    certificate.commonName,
  );
}

function downloadCertificateAsDer(certificate: CSR) {
  Download.certificateRequest.asDER(
    certificate.export('hex'),
    certificate.commonName,
  );
}

interface IMiscellaneousProps {
  certificate: CSR;
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
