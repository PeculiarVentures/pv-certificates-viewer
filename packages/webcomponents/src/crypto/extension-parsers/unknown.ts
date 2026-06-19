/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Convert } from 'pvtsutils';
import type { Extension } from '@peculiar/asn1-x509';
import type { IParsedExtension } from './types';

export interface IUnknownExtension extends IParsedExtension {
  children: [{ title: 'Raw Value'; value: string }];
}

export function parseUnknown(extension: Extension): IUnknownExtension {
  const raw = Convert.ToHex(extension.extnValue.buffer);

  return {
    oid: extension.extnID,
    critical: extension.critical ?? false,
    children: [{
      title: 'Raw Value', value: raw,
    }],
  };
}
