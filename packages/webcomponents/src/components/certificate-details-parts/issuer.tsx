/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';

import type { X509AttributeCertificate } from '../../crypto';
import { l10n } from '../../utils';
import { RowTitle } from './row';
import { GeneralNamePart } from './extensions/general_name_part';

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
      value={l10n.getString('issuer')}
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
