/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Convert } from 'pvtsutils';

import downloadFromBuffer from './download_from_buffer';

export class Download {
  public static certificate = {
    asPEM: (pem: string, name: string) => {
      downloadFromBuffer(
        Convert.FromString(pem),
        'application/pkix-cert',
        name,
        'cer',
      );
    },

    asDER: (hex: string, name: string) => {
      downloadFromBuffer(
        Convert.FromString(hex),
        'application/pkix-cert',
        name,
        'cer',
      );
    },
  };

  public static certificateRequest = {
    asPEM: (pem: string, name: string) => {
      downloadFromBuffer(
        Convert.FromString(pem),
        'application/pkcs10',
        name,
        'csr',
      );
    },

    asDER: (hex: string, name: string) => {
      downloadFromBuffer(
        Convert.FromString(hex),
        'application/pkcs10',
        name,
        'csr',
      );
    },
  };
}
