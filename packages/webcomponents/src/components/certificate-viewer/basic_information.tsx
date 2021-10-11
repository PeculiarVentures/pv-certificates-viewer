/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';

import { dateShort, l10n } from '../../utils';

import { RowTitle, RowValue } from './row';

interface IBasicInformationProps {
  serialNumber?: string;
  version?: number;
  validity?: string;
  notBefore?: Date;
  notAfter?: Date;
  type: string;
}

export const BasicInformation: FunctionalComponent<IBasicInformationProps> = (props) => {
  const {
    serialNumber,
    version,
    validity,
    notBefore,
    notAfter,
    type,
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
      name={l10n.getString('version')}
      value={version}
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
  ];
};
