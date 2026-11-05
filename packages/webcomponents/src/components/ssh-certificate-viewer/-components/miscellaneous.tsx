/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import { SshCertificate } from '../../../crypto';
import { Button } from '../../_shared/button';
import { RowTitle } from '../../_shared/details/row';
import { DownloadIcon } from '../../_shared/icons';

interface ISshMiscellaneousProps {
  certificate: SshCertificate;
}

export const SshMiscellaneous: FunctionalComponent<ISshMiscellaneousProps> = (props) => {
  const { certificate } = props;

  return [
    <RowTitle value="Miscellaneous" />,
    <tr>
      <td>
        <Button
          startIcon={<DownloadIcon />}
          onClick={() => certificate.download('pub')}
        >
          {'Download'}
        </Button>
      </td>
    </tr>,
  ];
};
