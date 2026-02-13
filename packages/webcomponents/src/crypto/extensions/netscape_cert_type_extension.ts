/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { NetscapeCertType } from '@peculiar/asn1-x509-netscape';
import { AsnParser } from '@peculiar/asn1-schema';
import { BaseExtension } from './base_extension';

/**
 * Netscape Certificate Type Extension
 */
export class NetscapeCertTypeExtension extends BaseExtension {
  public static override readonly NAME = 'Netscape Certificate Type';

  public readonly value: NetscapeCertType;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<NetscapeCertType>(asnExtnValue, NetscapeCertType);
  }

  public override toJSON(): Record<string, string | number | boolean | Array<Record<string, string | number | boolean>>> {
    return {
      Name: NetscapeCertTypeExtension.NAME,
      Critical: this.critical ? 'Yes' : 'No',
      Type: this.value.toJSON().join(', '),
    };
  }
}
