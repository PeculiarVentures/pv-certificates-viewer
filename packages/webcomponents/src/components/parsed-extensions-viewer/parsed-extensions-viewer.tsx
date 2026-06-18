/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import { getStringByOID } from '../../utils/get_string_by_oid';
import { Typography } from '../typography';
import {
  RowTitle,
  RowValue,
  TableRowTable,
} from '../certificate-details-parts/row';
import type { ParsedExtension, ExtensionNode } from '../../crypto/extension-parsers/types';

function renderNode(node: ExtensionNode) {
  if (node.title && !node.value?.toString()) {
    return [
      <RowValue
        name={getStringByOID(node.title)}
        value=""
      />,
      <TableRowTable>
        {node.children?.map(renderNode)}
      </TableRowTable>,
    ];
  }

  if (node.children?.length) {
    return (
      <TableRowTable>
        {node.title && (
          <tr>
            <td colSpan={2}>
              <Typography variant="b2" color="gray-9">
                {node.title}
              </Typography>
            </td>
          </tr>
        )}
        {node.children.map(renderNode)}
      </TableRowTable>
    );
  }

  return (
    <RowValue
      name={node.title}
      value={node.value != null ? String(node.value) : ''}
    />
  );
}

interface IParsedExtensionsProps {
  extensions: ParsedExtension[];
}

export const ParsedExtensions: FunctionalComponent<IParsedExtensionsProps> = ({ extensions }) => {
  if (!extensions?.length) {
    return null;
  }

  return [
    <RowTitle value="Extensions" />,
    extensions.map((extension) => {
      return [
        <tr>
          <td colSpan={2}>
            <Typography variant="s2" color="gray-9">
              {getStringByOID(extension.oid)}
            </Typography>
          </td>
        </tr>,
        <RowValue
          name="Critical"
          value={extension.critical ? 'YES' : 'NO'}
        />,
        extension.children.map(renderNode),
        <tr>
          <td colSpan={2} class="divider">
            <span />
          </td>
        </tr>,
      ];
    }),
  ];
};
