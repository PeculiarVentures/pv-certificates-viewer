import { h } from '@stencil/core';

import { Extension } from '../../../crypto/extension';
import { rowValue } from '../row_value';
import { getStringByOID } from '../get_string_by_oid';

export function basic(extension: Extension, children: any = null) {
  return ([
    rowValue(
      'Name',
      getStringByOID(extension.asn.extnID),
    ),
    rowValue(
      'Critical',
      extension.asn.critical ? 'YES' : 'NO',
    ),
    children,
    <tr>
      <td colSpan={2} class="divider">
        <span class="bg_fill"></span>
      </td>
    </tr>,
  ]);
}
