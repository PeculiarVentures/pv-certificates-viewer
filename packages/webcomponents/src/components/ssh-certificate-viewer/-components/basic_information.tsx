/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import { dateShort } from '../../../utils';
import { RowTitle, RowValue } from '../../_shared/details/row';

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
    <RowTitle value="Basic Information" />,
    <RowValue
      name="Type"
      value={type}
    />,
    <RowValue
      name="Serial Number"
      value={serialNumber}
      monospace
    />,
    <RowValue
      name="Validity"
      value={validity}
    />,
    <RowValue
      name="Issued"
      value={notBefore ? dateShort(notBefore) : undefined}
    />,
    <RowValue
      name="Expired"
      value={notAfter ? dateShort(notAfter) : undefined}
    />,
    <RowValue
      name="Key ID"
      value={keyId}
    />,
    <RowValue
      name="Principals"
      value={principals.join(', ') || '(none)'}
    />,
    <RowValue
      name="Critical Options"
      value={Object.keys(criticalOptions).join(', ') || '(none)'}
    />,
    <RowValue
      name="Extensions"
      value={Object.keys(extensions).join(', ') || '(none)'}
    />,
  ];
};
