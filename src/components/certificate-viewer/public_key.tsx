import { Convert } from 'pvtsutils';

import { IPublicKey } from '../../crypto';

import { rowTitle } from './row_title';
import { rowValue } from './row_value';
import { getStringByOID } from './get_string_by_oid';

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

export function publicKey(publicKey: IPublicKey) {
  if (!publicKey) {
    return null;
  }

  return [
    rowTitle('Public Key Info'),
    rowValue(
      'Algorithm',
      getStringByOID(publicKey.algorithm),
    ),
    rowValue(
      'Named Curve',
      getStringByOID(publicKey.params?.['namedCurve']),
    ),
    rowValue(
      'Exponent',
      getPublicKeyExponent(publicKey),
    ),
    rowValue(
      'Modulus',
      getPublicKeyModulus(publicKey),
    ),
    rowValue(
      'Value',
      Convert.ToHex(publicKey.value),
      { monospace: true, collapse: true },
    ),
  ];
}
