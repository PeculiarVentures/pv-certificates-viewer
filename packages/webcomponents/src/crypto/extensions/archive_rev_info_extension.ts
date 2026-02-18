/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ArchiveRevInfo, id_adbe_archiveRevInfo } from '@peculiar/asn1-adobe-acrobat';
import { AsnParser } from '@peculiar/asn1-schema';
import { ExtensionFactory } from './extension_factory';
import { BaseExtension } from './base_extension';
import { row, rowGroup } from '../rows_format';

/**
 * Archive Rev Info Extension
 */
export class ArchiveRevInfoExtension extends BaseExtension {
  public readonly value: ArchiveRevInfo;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<ArchiveRevInfo>(asnExtnValue, ArchiveRevInfo);
  }

  public override toJSON() {
    return rowGroup(this.name, [[
      row('Critical', this.critical),
      row('Version', this.value.version),
    ]]);
  }
}

ExtensionFactory.register(id_adbe_archiveRevInfo, ArchiveRevInfoExtension);
