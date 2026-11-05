/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Extension } from '@peculiar/asn1-x509';
import { hex } from '@peculiar/utils/encoding';
import type { IParsedExtension } from './types';

export interface IUnknownExtension extends IParsedExtension {
  children: [{ title: 'Raw Value'; value: string }];
}

export function parseUnknown(extension: Extension): IUnknownExtension {
  const raw = hex.encode(extension.extnValue.buffer);

  return {
    oid: extension.extnID,
    critical: extension.critical ?? false,
    children: [
      {
        title: 'Raw Value',
        value: raw,
      },
    ],
  };
}
