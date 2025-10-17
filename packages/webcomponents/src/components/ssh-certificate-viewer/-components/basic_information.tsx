/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import { RowTitle, RowValue } from '../../certificate-details-parts/row';
import { dateShort, l10n } from '../../../utils';

interface ISshBasicInformationProps {
  serialNumber: string;
  validity: string;
  notBefore: Date;
  notAfter: Date;
  type: string;
  keyId: string;
  principals: string[];
  extensions: Record<string, string>;
  criticalOptions: Record<string, string>;
}

export const SshBasicInformation: FunctionalComponent<ISshBasicInformationProps> = (props) => {
  const {
    serialNumber,
    validity,
    notBefore,
    notAfter,
    type,
    keyId,
    principals,
    extensions,
    criticalOptions,
  } = props;

  return [
    <RowTitle
      value={l10n.getString('basicInformation')}
    />,
    <RowValue
      name={l10n.getString('type')}
      value={type}
    />,
    <RowValue
      name={l10n.getString('serialNumber')}
      value={serialNumber}
      monospace
    />,
    <RowValue
      name={l10n.getString('validity')}
      value={validity}
    />,
    <RowValue
      name={l10n.getString('issued')}
      value={notBefore ? dateShort(notBefore) : undefined}
    />,
    <RowValue
      name={l10n.getString('expired')}
      value={notAfter ? dateShort(notAfter) : undefined}
    />,
    <RowValue
      name={l10n.getString('keyId')}
      value={keyId}
    />,
    <RowValue
      name={l10n.getString('principals')}
      value={principals.join(', ') || '(none)'}
    />,
    <RowValue
      name={l10n.getString('criticalOptions')}
      value={Object.keys(criticalOptions).join(', ') || '(none)'}
    />,
    <RowValue
      name={l10n.getString('extensions')}
      value={Object.keys(extensions).join(', ') || '(none)'}
    />,
  ];
};
