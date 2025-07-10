/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Name as AsnName } from '@peculiar/asn1-x509';
import { AsnParser } from '@peculiar/asn1-schema';
import { BufferSourceConverter } from 'pvtsutils';
import { OIDs, OIDsShort } from '../constants/oids';

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface INameJSON {
  type: string;
  name: string;
  shortName: string;
  value: string;
}

export class Name {
  #asn = new AsnName();

  public constructor(data: BufferSource | AsnName) {
    if (BufferSourceConverter.isBufferSource(data)) {
      this.#asn = AsnParser.parse(data, AsnName);
    } else {
      this.#asn = data;
    }
  }

  public toJSON(): INameJSON[] {
    const res = [];

    this.#asn.forEach((o) => (
      o.forEach((a) => {
        res.push({
          type: a.type,
          name: OIDs[a.type],
          shortName: OIDsShort[a.type],
          value: a.value.toString(),
        });
      })
    ));

    return res;
  }
}
