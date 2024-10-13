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
