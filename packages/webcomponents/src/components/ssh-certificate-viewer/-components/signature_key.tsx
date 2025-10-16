/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import { SshCertificate } from '../../../crypto';
import { l10n, getStringByOID } from '../../../utils';
import {
  RowTitle,
  RowValue,
} from '../../certificate-details-parts/row';

interface ISshSignatureKeyProps {
  key: SshCertificate['signatureKey'];
}

export const SshSignatureKey: FunctionalComponent<ISshSignatureKeyProps> = (props) => {
  const { key } = props;

  if (!key) {
    return null;
  }

  return [
    <RowTitle
      value={l10n.getString('signingCA')}
    />,
    <RowValue
      name={l10n.getString('algorithm')}
      value={getStringByOID(key.algorithm)}
    />,
    <RowValue
      name="Thumbprint (SHA-256)"
      value={key.thumbprint}
      monospace
    />,
    <RowValue
      name={l10n.getString('value')}
      value={key.value}
      monospace
      collapse
    />,
  ];
};
