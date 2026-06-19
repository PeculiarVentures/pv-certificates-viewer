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

const oidToShortName = {
  '2.5.4.3': 'CN',
  '2.5.4.4': 'SN',
  '2.5.4.5': 'SERIALNUMBER',
  '2.5.4.6': 'C',
  '2.5.4.7': 'L',
  '2.5.4.8': 'ST',
  '2.5.4.9': 'STREET',
  '2.5.4.10': 'O',
  '2.5.4.11': 'OU',
  '2.5.4.12': 'T',
  '2.5.4.17': 'PostalCode',
  '2.5.4.20': 'TelephoneNumber',
  '2.5.4.42': 'GN',
  '2.5.4.43': 'I',
  '2.5.4.44': 'GenerationQualifier',
  '2.5.4.46': 'DNQ',
  '2.5.4.65': 'Pseudonym',
  '2.5.4.97': 'OI',
  '0.9.2342.19200300.100.1.1': 'UID',
  '0.9.2342.19200300.100.1.25': 'DC',
  '1.2.840.113549.1.9.1': 'E',
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface INameJSON {
  type: string;
  value: string;
  short: string;
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Name {
  public static parse(data: BufferSource | AsnName): INameJSON[] {
    const asn = BufferSourceConverter.isBufferSource(data)
      ? AsnParser.parse(data, AsnName)
      : data;

    const res: INameJSON[] = [];

    asn.forEach((o) => (
      o.forEach((a) => {
        res.push({
          type: a.type,
          value: a.value.toString(),
          short: oidToShortName[a.type] || a.type,
        });
      })
    ));

    return res;
  }
}
