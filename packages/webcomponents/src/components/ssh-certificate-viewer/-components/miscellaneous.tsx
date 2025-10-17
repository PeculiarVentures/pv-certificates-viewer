/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import { SshCertificate } from '../../../crypto';
import { l10n } from '../../../utils';
import { Button } from '../../button';
import { DownloadIcon } from '../../icons';
import { RowTitle } from '../../certificate-details-parts/row';

interface ISshMiscellaneousProps {
  certificate: SshCertificate;
}

export const SshMiscellaneous: FunctionalComponent<ISshMiscellaneousProps> = (props) => {
  const { certificate } = props;

  return [
    <RowTitle
      value={l10n.getString('miscellaneous')}
    />,
    <tr>
      <td>
        <Button
          startIcon={<DownloadIcon />}
          onClick={() => certificate.downloadAsPub()}
        >
          {l10n.getString('download')}
        </Button>
      </td>
    </tr>,
  ];
};
