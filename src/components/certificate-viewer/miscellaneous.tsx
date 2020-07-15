import { h } from '@stencil/core';

import { X509Certificate } from '../../crypto';
import { Download } from '../../utils/download';

import { rowTitle } from './row_title';

export function miscellaneous(certificate: X509Certificate) {
  const onClickDownloadAsPem = () =>
    Download.certificate.asPEM(
      certificate.export('pem'),
      certificate.commonName,
    );
  const onClickDownloadAsDer = () =>
    Download.certificate.asDER(
      certificate.export('hex'),
      certificate.commonName,
    );

  return [
    rowTitle('Miscellaneous'),
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
          onClick={onClickDownloadAsPem}
          actions={[{
            text: 'Download DER',
            onClick: onClickDownloadAsDer,
          }]}
        >
          Download PEM
        </peculiar-button-split>
      </td>
    </tr>,
  ];
}
