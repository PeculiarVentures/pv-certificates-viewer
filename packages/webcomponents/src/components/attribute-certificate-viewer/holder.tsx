import { h, FunctionalComponent } from '@stencil/core';
import { Convert } from 'pvtsutils';

import type { X509AttributeCertificate } from '../../crypto';
import { RowTitle, RowValue } from '../certificate-viewer/row';
import { getStringByOID } from '../certificate-viewer/get_string_by_oid';
import { GeneralNamePart } from '../certificate-viewer/extensions/general_name_part';

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
      value="Holder"
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
        name="Serial"
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
        name="Digest Info"
        value=""
      />,
      <RowValue
        name="Algorithm"
        value={getStringByOID(objectDigestInfo.digestAlgorithm.algorithm)}
      />,
      <RowValue
        name="Value"
        value={Convert.ToHex(objectDigestInfo.objectDigest)}
        monospace
      />,
      <RowValue
        name="Type"
        value={objectDigestInfo.digestedObjectType}
      />,
    ]),
  ];
};
