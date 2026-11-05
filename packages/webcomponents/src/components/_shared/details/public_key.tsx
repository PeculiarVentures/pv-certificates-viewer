/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import { hex } from '@peculiar/utils/encoding';
import { IPublicKey } from '../../../crypto';
import { getStringByOID } from '../../../utils';
import { RowTitle, RowValue, TableRowTable } from './row';

function getPublicKeyModulus(publicKey: IPublicKey) {
  if (publicKey.params && 'modulus' in publicKey.params) {
    let length = publicKey.params.modulus.byteLength;

    if (length % 2) {
      length -= 1;
    }

    return length * 8;
  }

  return null;
}

function getPublicKeyExponent(publicKey: IPublicKey) {
  if (publicKey.params && 'publicExponent' in publicKey.params) {
    return publicKey.params.publicExponent.byteLength === 3 ? 65537 : 3;
  }

  return null;
}

interface IPublicKeyProps {
  publicKey: IPublicKey;
}

export const PublicKey: FunctionalComponent<IPublicKeyProps> = (props) => {
  const { publicKey } = props;

  if (!publicKey) {
    return null;
  }

  function renderKeyDetails(key: IPublicKey) {
    const namedCurve =
      key.params && 'namedCurve' in key.params ? (key.params.namedCurve ?? '') : '';

    return [
      <RowValue
        name="Algorithm"
        value={getStringByOID(key.algorithm)}
      />,
      <RowValue
        name="Named Curve"
        value={namedCurve ? getStringByOID(namedCurve) : undefined}
      />,
      <RowValue
        name="Exponent"
        value={getPublicKeyExponent(key)}
      />,
      <RowValue
        name="Modulus"
        value={getPublicKeyModulus(key)}
      />,
      <RowValue
        name="Value"
        value={hex.encode(key.value)}
        monospace
        collapse
      />,
    ];
  }

  return [
    <RowTitle value="Public Key Info" />,
    renderKeyDetails(publicKey),
    Array.isArray(publicKey.params) &&
      publicKey.params.length &&
      publicKey.params.map((param) => <TableRowTable>{renderKeyDetails(param)}</TableRowTable>),
  ];
};
