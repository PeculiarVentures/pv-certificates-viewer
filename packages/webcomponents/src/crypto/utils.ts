/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Convert } from 'pvtsutils';
import { PemConverter } from './pem_converter';

import { cryptoProvider } from './provider';

const isASCII = (text: string) => {
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);

    if (code > 0xFF) {
      return false;
    }
  }

  return true;
}

export const certificateRawToBuffer = (raw: string): ArrayBuffer => {
  if (PemConverter.isPem(raw)) {
    return PemConverter.decode(raw)[0];
  }

  if (Convert.isHex(raw)) {
    return Convert.FromHex(raw);
  }

  if (Convert.isBase64(raw)) {
    return Convert.FromBase64(raw);
  }

  if (Convert.isBase64Url(raw)) {
    return Convert.FromBase64Url(raw);
  }

  if (isASCII(raw)) {
    return Convert.FromUtf8String(raw, 'ascii');
  }

  throw new TypeError("Unsupported format of 'raw' argument. Must be one of DER, PEM, HEX, Base64, or Base4Url");
};

export const getCertificateThumbprint = async (
  algorithm: globalThis.AlgorithmIdentifier,
  data: ArrayBuffer,
): Promise<ArrayBuffer | undefined> => {
  const crypto = cryptoProvider.get();

  if (crypto.subtle) {
    return crypto.subtle.digest(algorithm, data);
  }

  return undefined;
};
