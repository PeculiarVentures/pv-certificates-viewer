import { h, FunctionalComponent } from '@stencil/core';

import type { X509Certificate } from '../../crypto';
import { Download } from '../../utils/download';

import { RowTitle } from '../certificate-viewer/row';

function downloadCertificateAsPem(certificate: X509Certificate) {
  Download.certificate.asPEM(
    certificate.export('pem'),
    certificate.commonName,
  );
}

function downloadCertificateAsDer(certificate: X509Certificate) {
  Download.certificate.asDER(
    certificate.export('hex'),
    certificate.commonName,
  );
}

interface IMiscellaneousProps {
  certificate: X509Certificate;
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
