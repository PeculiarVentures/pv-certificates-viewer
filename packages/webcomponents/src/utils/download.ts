/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Convert } from 'pvtsutils';
import { downloadFromBuffer } from './download_from_buffer';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Download {
  public static cert = {
    asPEM: (pem: string, name: string) => {
      downloadFromBuffer(
        Convert.FromString(pem),
        name,
        'cer',
        'application/pkix-cert',
      );
    },

    asDER: (raw: ArrayBuffer, name: string) => {
      downloadFromBuffer(
        raw,
        name,
        'cer',
        'application/pkix-cert',
      );
    },
  };

  public static attrCert = {
    asPEM: (pem: string, name: string) => {
      downloadFromBuffer(
        Convert.FromString(pem),
        name,
        'cer',
        'application/pkix-attr-cert',
      );
    },

    asDER: (raw: ArrayBuffer, name: string) => {
      downloadFromBuffer(
        raw,
        name,
        'cer',
        'application/pkix-attr-cert',
      );
    },
  };

  public static csr = {
    asPEM: (pem: string, name: string) => {
      downloadFromBuffer(
        Convert.FromString(pem),
        name,
        'csr',
        'application/pkcs10',
      );
    },

    asDER: (raw: ArrayBuffer, name: string) => {
      downloadFromBuffer(
        raw,
        name,
        'csr',
        'application/pkcs10',
      );
    },
  };

  public static crl = {
    asPEM: (pem: string, name: string) => {
      downloadFromBuffer(
        Convert.FromString(pem),
        name,
        'crl',
        'application/pkix-crl',
      );
    },

    asDER: (raw: ArrayBuffer, name: string) => {
      downloadFromBuffer(
        raw,
        name,
        'crl',
        'application/pkix-crl',
      );
    },
  };

  public static certSSH = {
    asPub: (value: string, name: string) => {
      downloadFromBuffer(
        Convert.FromString(value),
        name,
        'pub',
        'text/plain',
      );
    },
  };
}
