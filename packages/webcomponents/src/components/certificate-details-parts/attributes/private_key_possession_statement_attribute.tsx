/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AsnConvert } from '@peculiar/asn1-schema';
import { h, FunctionalComponent } from '@stencil/core';
import { PrivateKeyPossessionStatement } from '@peculiar/asn1-private-key-stmt';
import { Convert } from 'pvtsutils';
import { Attribute } from '../../../crypto/attribute';
import { RowValue, TableRowTable } from '../row';
import { BasicAttribute } from './basic_attribute';
import { NamePart } from './name_part';

interface IPrivateKeyPossessionStatementAttributeProps {
  attribute: Attribute<PrivateKeyPossessionStatement>;
}

export const PrivateKeyPossessionStatementAttribute:
FunctionalComponent<IPrivateKeyPossessionStatementAttributeProps> = (props) => {
  const { attribute } = props;
  const certificateRaw = attribute.value.cert
    ? AsnConvert.serialize(attribute.value.cert)
    : null;

  return (
    <BasicAttribute
      attribute={attribute}
    >
      <RowValue
        name="Serial Number"
        value={Convert.ToHex(attribute.value.signer.serialNumber)}
        monospace
      />
      <RowValue
        name="Issuer"
        value=""
      />
      <TableRowTable>
        <NamePart
          name={attribute.value.signer.issuer}
        />
      </TableRowTable>
      {certificateRaw && [
        <RowValue
          name="Certificate"
          value=""
        />,
        <TableRowTable>
          <peculiar-certificate-viewer
            certificate={Convert.ToBase64(certificateRaw)}
          />
        </TableRowTable>,
      ]}
    </BasicAttribute>
  );
};
