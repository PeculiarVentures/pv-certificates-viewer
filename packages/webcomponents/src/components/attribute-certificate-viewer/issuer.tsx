import { h, FunctionalComponent } from '@stencil/core';

import type { X509AttributeCertificate } from '../../crypto';
import { RowTitle } from '../certificate-viewer/row';
import { GeneralNamePart } from '../certificate-viewer/extensions/general_name_part';

interface IIssuerProps {
  issuer: X509AttributeCertificate['issuer'];
}

export const Issuer: FunctionalComponent<IIssuerProps> = (props) => {
  const { issuer } = props;

  if (!issuer) {
    return null;
  }

  return [
    <RowTitle
      value="Issuer"
    />,
    issuer.map((item) => (
      <GeneralNamePart
        generalName={item}
        getDNSNameLink={() => ''}
        getIPAddressLink={() => ''}
      />
    )),
  ];
};
