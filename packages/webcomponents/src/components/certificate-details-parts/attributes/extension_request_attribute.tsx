/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import { ExtensionRequest } from '@peculiar/asn1-pkcs9';
import { AsnConvert } from '@peculiar/asn1-schema';
import { Extension, TExtensionValue } from '../../../crypto/extension';
import { Attribute } from '../../../crypto/attribute';
import { Extensions } from '../../certificate-details-parts';
import { TableRowTable } from '../row';
import { BasicAttribute } from './basic_attribute';

interface IExtensionRequestAttributeProps {
  attribute: Attribute<ExtensionRequest>;
}

export const ExtensionRequestAttribute:
FunctionalComponent<IExtensionRequestAttributeProps> = (props) => {
  const { attribute } = props;
  let extensions: Extension<TExtensionValue>[];

  if (attribute.value) {
    extensions = attribute.value.map((e) => new Extension(AsnConvert.serialize(e)));
  }

  return (
    <BasicAttribute
      attribute={attribute}
    >
      <TableRowTable>
        <Extensions
          extensions={extensions}
          getDNSNameLink={() => ''}
          getIPAddressLink={() => ''}
          getLEILink={() => ''}
        />
      </TableRowTable>
    </BasicAttribute>
  );
};
