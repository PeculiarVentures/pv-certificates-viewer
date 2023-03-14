/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import { Convert } from 'pvtsutils';

import { IPublicKey } from '../../crypto';
import { l10n, getStringByOID } from '../../utils';

import { RowTitle, RowValue, TableRowTable } from './row';

function getPublicKeyModulus(publicKey: IPublicKey) {
  if (publicKey.params?.['modulus']) {
    let length = publicKey.params['modulus'].byteLength;

    if (length % 2) {
      length -= 1;
    }

    return length * 8;
  }

  return null;
}

function getPublicKeyExponent(publicKey: IPublicKey) {
  if (publicKey.params?.['publicExponent']) {
    return publicKey.params['publicExponent'].byteLength === 3
      ? 65537
      : 3;
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
    return [
      <RowValue
        name={l10n.getString('algorithm')}
        value={getStringByOID(key.algorithm)}
      />,
      <RowValue
        name={l10n.getString('namedCurve')}
        value={getStringByOID(key.params?.['namedCurve'])}
      />,
      <RowValue
        name={l10n.getString('exponent')}
        value={getPublicKeyExponent(key)}
      />,
      <RowValue
        name={l10n.getString('modulus')}
        value={getPublicKeyModulus(key)}
      />,
      <RowValue
        name={l10n.getString('value')}
        value={Convert.ToHex(key.value)}
        monospace
        collapse
      />,
    ];
  }

  return [
    <RowTitle
      value={l10n.getString('publicKeyInfo')}
    />,
    renderKeyDetails(publicKey),
    (Array.isArray(publicKey.params) && publicKey.params.length && publicKey.params.map((param) => (
      <TableRowTable>
        {renderKeyDetails(param)}
      </TableRowTable>
    ))),
  ];
};
