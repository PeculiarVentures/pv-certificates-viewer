/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AsnConvert } from '@peculiar/asn1-schema';
import { BufferSourceConverter } from 'pvtsutils';

export class AsnData<T> {
  #asn: T;

  #raw: ArrayBuffer;

  public constructor(raw: BufferSource, type: { new(): T; });

  public constructor(...args: any[]) {
    if (args.length === 1) {
      // asn
      // eslint-disable-next-line prefer-destructuring
      this.#asn = args[0];
      this.#raw = AsnConvert.serialize(this.#asn);
    } else {
      // raw, type
      this.#asn = AsnConvert.parse(args[0], args[1]);
      this.#raw = BufferSourceConverter.toArrayBuffer(args[0]);
    }
  }

  get asn() {
    return this.#asn;
  }

  get raw() {
    return this.#raw;
  }
}
