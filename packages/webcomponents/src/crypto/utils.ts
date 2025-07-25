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

  return Convert.FromBinary(raw);
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
