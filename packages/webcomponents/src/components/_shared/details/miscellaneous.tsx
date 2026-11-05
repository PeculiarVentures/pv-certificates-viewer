/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import { Button } from '../button';
import { DownloadIcon } from '../icons';
import { RowTitle } from './row';

interface IMiscellaneousProps {
  certificate: { download: (format: 'pem' | 'der') => void };
}

export const Miscellaneous: FunctionalComponent<IMiscellaneousProps> = (props) => {
  const { certificate } = props;

  return [
    <RowTitle value="Miscellaneous" />,
    <tr>
      <td>
        <Button
          startIcon={<DownloadIcon />}
          onClick={() => certificate.download('pem')}
        >
          {'Download PEM'}
        </Button>
      </td>
    </tr>,
    <tr>
      <td>
        <Button
          startIcon={<DownloadIcon />}
          onClick={() => certificate.download('der')}
        >
          {'Download DER'}
        </Button>
      </td>
    </tr>,
  ];
};
