/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { NetscapeComment, id_netscapeComment } from '@peculiar/asn1-x509-netscape';
import { AsnParser } from '@peculiar/asn1-schema';
import { ExtensionFactory } from './extension_factory';
import { BaseExtension } from './base_extension';

/**
 * Netscape Comment Extension
 */
export class NetscapeCommentExtension extends BaseExtension {
  public static override readonly NAME = 'Netscape Comment';

  public readonly value: NetscapeComment;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<NetscapeComment>(asnExtnValue, NetscapeComment);
  }

  public override toJSON(): Record<string, string | number | boolean | Array<Record<string, string | number | boolean>>> {
    return {
      Name: NetscapeCommentExtension.NAME,
      Critical: this.critical ? 'Yes' : 'No',
      Comment: this.value.value,
    };
  }
}

ExtensionFactory.register(id_netscapeComment, NetscapeCommentExtension);
