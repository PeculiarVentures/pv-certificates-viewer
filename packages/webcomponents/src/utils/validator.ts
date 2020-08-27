/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-useless-escape */
export default {
  isHex: (value: string) => /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/
    .test(value),
  isPem: (value: string) => /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/
    .test(value),
  isX509Pem: (value: string) => /-----BEGIN CERTIFICATE-----([A-Za-z0-9+\/=\s]+)-----END CERTIFICATE-----/
    .test(value),
  isX509AttributePem: (value: string) => /-----BEGIN ATTRIBUTE CERTIFICATE-----([A-Za-z0-9+\/=\s]+)-----END ATTRIBUTE CERTIFICATE-----/
    .test(value),
  isBase64: (value: string) => {
    try {
      window.atob(value);
      return true;
    } catch (error) {
      return false;
    }
  },
};
