import { h, FunctionalComponent } from '@stencil/core';

import { Extension } from '../../../crypto/extension';
import { getStringByOID } from '../get_string_by_oid';
import { RowValue } from '../row';

interface IBasicExtensionProps {
  extension: Extension;
}

export const BasicExtension: FunctionalComponent<IBasicExtensionProps> = (props, children) => {
  const { extension } = props;

  return ([
    <RowValue
      name="Name"
      value={getStringByOID(extension.asn.extnID)}
    />,
    <RowValue
      name="Critical"
      value={extension.asn.critical ? 'YES' : 'NO'}
    />,
    children,
    <tr>
      <td colSpan={2} class="divider">
        <span class="bg_fill"></span>
      </td>
    </tr>,
  ]);
};
