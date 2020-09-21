/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import { Convert } from 'pvtsutils';

import type { X509AttributeCertificate } from '../../crypto';
import { RowTitle, RowValue } from '../certificate-viewer/row';
import { getStringByOID } from '../certificate-viewer/get_string_by_oid';
import { GeneralNamePart } from '../certificate-viewer/extensions/general_name_part';
import { l10n } from '../../utils';

interface IHolderProps {
  holder: X509AttributeCertificate['holder'];
}

export const Holder: FunctionalComponent<IHolderProps> = (props) => {
  const { holder } = props;

  if (!holder) {
    return null;
  }

  const { baseCertificateID, objectDigestInfo } = holder;

  return [
    <RowTitle
      value={l10n.getString('holder')}
    />,
    baseCertificateID && ([
      baseCertificateID.issuer.map((item) => (
        <GeneralNamePart
          generalName={item}
          getDNSNameLink={() => ''}
          getIPAddressLink={() => ''}
        />
      )),
      <tr>
        <td />
        <td />
      </tr>,
      <RowValue
        name={l10n.getString('serialNumber')}
        value={Convert.ToHex(baseCertificateID.serial)}
        monospace
      />,
      <tr>
        <td />
        <td />
      </tr>,
    ]),
    objectDigestInfo && ([
      <RowValue
        name={l10n.getString('digestInfo')}
        value=""
      />,
      <RowValue
        name={l10n.getString('algorithm')}
        value={getStringByOID(objectDigestInfo.digestAlgorithm.algorithm)}
      />,
      <RowValue
        name={l10n.getString('value')}
        value={Convert.ToHex(objectDigestInfo.objectDigest)}
        monospace
      />,
      <RowValue
        name={l10n.getString('type')}
        value={objectDigestInfo.digestedObjectType}
      />,
    ]),
  ];
};
