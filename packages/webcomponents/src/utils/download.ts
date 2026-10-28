/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { toArrayBuffer } from '@peculiar/utils/bytes';
import { utf8 } from '@peculiar/utils/encoding';
import { downloadFromBuffer } from './download_from_buffer';

export class Download {
  public static cert = {
    asPEM: (pem: string, name: string) => {
      void downloadFromBuffer(
        toArrayBuffer(utf8.encode(pem)),
        name,
        'cer',
        'application/pkix-cert',
      );
    },

    asDER: (raw: ArrayBuffer, name: string) => {
      void downloadFromBuffer(raw, name, 'cer', 'application/pkix-cert');
    },
  };

  public static attrCert = {
    asPEM: (pem: string, name: string) => {
      void downloadFromBuffer(
        toArrayBuffer(utf8.encode(pem)),
        name,
        'cer',
        'application/pkix-attr-cert',
      );
    },

    asDER: (raw: ArrayBuffer, name: string) => {
      void downloadFromBuffer(raw, name, 'cer', 'application/pkix-attr-cert');
    },
  };

  public static csr = {
    asPEM: (pem: string, name: string) => {
      void downloadFromBuffer(toArrayBuffer(utf8.encode(pem)), name, 'csr', 'application/pkcs10');
    },

    asDER: (raw: ArrayBuffer, name: string) => {
      void downloadFromBuffer(raw, name, 'csr', 'application/pkcs10');
    },
  };

  public static crl = {
    asPEM: (pem: string, name: string) => {
      void downloadFromBuffer(toArrayBuffer(utf8.encode(pem)), name, 'crl', 'application/pkix-crl');
    },

    asDER: (raw: ArrayBuffer, name: string) => {
      void downloadFromBuffer(raw, name, 'crl', 'application/pkix-crl');
    },
  };

  public static certSSH = {
    asPub: (value: string, name: string) => {
      void downloadFromBuffer(toArrayBuffer(utf8.encode(value)), name, 'pub', 'text/plain');
    },
  };
}
