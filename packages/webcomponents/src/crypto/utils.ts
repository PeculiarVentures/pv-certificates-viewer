/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { toArrayBuffer } from '@peculiar/utils/bytes';
import { base64, base64url, binary, hex } from '@peculiar/utils/encoding';
import { PemConverter } from './pem_converter';
import { cryptoProvider } from './provider';

// HEX digits with whitespace between them, odd length allowed. No `0x` prefix and no
// `:`, `-` or `.` separators, which `hex.decode` accepts by default.
const HEX_TEXT = {
  separators: [' ', '\t', '\n', '\r'],
  allowOddLength: true,
  allowPrefix: false,
} as const;

// `base64.is` and `base64url.is` ignore all whitespace. Spaces and tabs must still prevent
// detection, or text such as "Hello World" would be decoded as Base64Url.
const hasWhitespace = (text: string) => /[\t\n\r ]/.test(text);

/** Checks for unpadded Base64Url text without whitespace. */
export const isBase64UrlText = (text: string): boolean =>
  text !== '' && !hasWhitespace(text) && base64url.is(text);

export const certificateRawToBuffer = (raw: string): ArrayBuffer => {
  if (PemConverter.isPem(raw)) {
    return PemConverter.decode(raw)[0];
  }

  // Ignore line breaks so line-wrapped Base64 (a PEM body without the armor) is detected
  const unwrapped = raw.replace(/[\r\n]/g, '');

  if (hex.is(raw, HEX_TEXT)) {
    return toArrayBuffer(hex.decode(raw, HEX_TEXT));
  }

  if (!hasWhitespace(unwrapped) && base64.is(unwrapped)) {
    return toArrayBuffer(base64.decode(unwrapped));
  }

  if (isBase64UrlText(raw)) {
    return toArrayBuffer(base64url.decode(raw));
  }

  return toArrayBuffer(binary.decode(raw));
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
