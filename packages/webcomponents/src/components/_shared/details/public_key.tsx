/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import type { IPublicKeyJSON } from '../../../crypto/fields/public_key';
import { getStringByOID } from '../../../utils';
import { RowTitle, RowValue, TableRowTable } from './row';

interface IPublicKeyProps {
  publicKey: IPublicKeyJSON;
}

const renderKeyDetails = (key: IPublicKeyJSON) => [
  <RowValue
    name="Algorithm"
    value={getStringByOID(key.algorithm)}
  />,
  <RowValue
    name="Named Curve"
    value={key.namedCurve ? getStringByOID(key.namedCurve) : undefined}
  />,
  <RowValue
    name="Exponent"
    value={key.exponent}
  />,
  <RowValue
    name="Modulus"
    value={key.modulusBits}
  />,
  <RowValue
    name="Value"
    value={key.value}
    monospace
    collapse
  />,
];

export const PublicKey: FunctionalComponent<IPublicKeyProps> = ({ publicKey }) => {
  if (!publicKey) {
    return null;
  }

  return [
    <RowTitle value="Public Key Info" />,
    renderKeyDetails(publicKey),
    publicKey.parts?.map((part) => <TableRowTable>{renderKeyDetails(part)}</TableRowTable>),
  ];
};
