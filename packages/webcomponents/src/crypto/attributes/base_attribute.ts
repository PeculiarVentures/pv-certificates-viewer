/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Attribute as AsnAttribute } from '@peculiar/asn1-x509';
import { AsnData } from '../asn_data';

/**
 * Base class for all attribute types
 */
export abstract class BaseAttribute extends AsnData<AsnAttribute> {
  public static readonly NAME: string;

  constructor(raw: BufferSource) {
    super(raw, AsnAttribute);
  }

  public abstract toJSON(): Record<string, string | number | boolean | Record<string, string | number | boolean | Record<string, string>[]>[]>;
}
