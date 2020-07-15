import { h } from '@stencil/core';

import { X509Certificate } from '../../crypto';
import { Download } from '../../utils/download';

import { rowTitle } from './row_title';

export function miscellaneous(certificate: X509Certificate) {
  const onClickAsPem = () =>
    Download.certificate.asPEM(certificate.export('pem'), '1');
  const onClickAsDer = () =>
    Download.certificate.asDER(certificate.export('hex'), '2');

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
          onClick={onClickAsPem}
          actions={[{
            text: 'Download DER',
            onClick: onClickAsDer,
          }]}
        >
          Download PEM
        </peculiar-button-split>
      </td>
    </tr>,
  ];
}
