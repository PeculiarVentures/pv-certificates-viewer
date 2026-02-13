/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Extension as AsnExtension } from '@peculiar/asn1-x509';
import { AsnData } from '../asn_data';

/**
 * Base class for all extension types
 */
export abstract class BaseExtension extends AsnData<AsnExtension> {
  public static readonly NAME: string;

  constructor(raw: BufferSource) {
    super(raw, AsnExtension);
  }

  public get critical(): boolean {
    return this.asn.critical ?? false;
  }

  public abstract toJSON(): Record<string, string | number | boolean | Record<string, string | number | boolean | Record<string, string>[]>[]>;
}
