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
