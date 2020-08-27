/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';

import type { X509AttributeCertificate } from '../../crypto';
import { RowTitle, RowValue } from '../certificate-viewer/row';
import { dateShort } from '../../utils';

interface IBasicInfoProps {
  certificate: X509AttributeCertificate;
}

export const BasicInfo: FunctionalComponent<IBasicInfoProps> = (props) => {
  const { certificate } = props;

  if (!certificate) {
    return null;
  }

  return [
    <RowTitle
      value="Basic Information"
    />,
    <RowValue
      name="Serial number"
      value={certificate.serialNumber}
    />,
    <RowValue
      name="Version"
      value={certificate.version}
    />,
    <RowValue
      name="Validity"
      value={certificate.validity}
    />,
    <RowValue
      name="Issued"
      value={dateShort(certificate.notBefore)}
    />,
    <RowValue
      name="Expired"
      value={dateShort(certificate.notBefore)}
    />,
  ];
};
