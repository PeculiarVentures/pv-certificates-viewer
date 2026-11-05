/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import { dateShort } from '../../../utils';
import { RowTitle, RowValue } from './row';

interface IBasicInformationProps {
  serialNumber?: string;
  version?: number;
  validity?: string;
  notBefore?: Date;
  notAfter?: Date;
  lastUpdate?: Date;
  nextUpdate?: Date;
  type: string;
}

export const BasicInformation: FunctionalComponent<IBasicInformationProps> = (props) => {
  const { serialNumber, version, validity, notBefore, notAfter, lastUpdate, nextUpdate, type } =
    props;

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
      name="Version"
      value={version}
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
      name="Last Update"
      value={lastUpdate ? dateShort(lastUpdate) : undefined}
    />,
    <RowValue
      name="Next Update"
      value={nextUpdate ? dateShort(nextUpdate) : undefined}
    />,
  ];
};
