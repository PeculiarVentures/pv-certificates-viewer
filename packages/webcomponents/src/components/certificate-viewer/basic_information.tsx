/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';

import { dateShort } from '../../utils';

import { RowTitle, RowValue } from './row';

interface IBasicInformationProps {
  serialNumber: string;
  version: number;
  validity: string;
  notBefore: Date;
  notAfter: Date;
}

export const BasicInformation: FunctionalComponent<IBasicInformationProps> = (props) => {
  const {
    serialNumber, version, validity, notBefore, notAfter,
  } = props;

  return [
    <RowTitle
      value="Basic Information"
    />,
    <RowValue
      name="Serial Number"
      value={serialNumber}
      monospace
    />,
    <RowValue
      name="Version"
      value={version}
    />,
    <RowValue
      name="Validity"
      value={validity}
    />,
    <RowValue
      name="Issued"
      value={dateShort(notBefore)}
    />,
    <RowValue
      name="Expired"
      value={dateShort(notAfter)}
    />,
  ];
};
