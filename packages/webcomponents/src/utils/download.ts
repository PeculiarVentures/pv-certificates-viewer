/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Convert } from 'pvtsutils';

import { downloadFromBuffer } from './download_from_buffer';

export class Download {
  public static x509 = {
    asPEM: (pem: string, name: string) => {
      downloadFromBuffer(
        Convert.FromString(pem),
        name,
        'cer',
        'application/pkix-cert',
      );
    },

    asDER: (hex: string, name: string) => {
      downloadFromBuffer(
        Convert.FromString(hex),
        name,
        'cer',
        'application/pkix-cert',
      );
    },
  };

  public static pkcs10 = {
    asPEM: (pem: string, name: string) => {
      downloadFromBuffer(
        Convert.FromString(pem),
        name,
        'csr',
        'application/pkcs10',
      );
    },

    asDER: (hex: string, name: string) => {
      downloadFromBuffer(
        Convert.FromString(hex),
        name,
        'csr',
        'application/pkcs10',
      );
    },
  };
}
