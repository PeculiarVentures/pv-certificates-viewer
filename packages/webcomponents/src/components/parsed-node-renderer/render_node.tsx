/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h } from '@stencil/core';
import { getStringByOID } from '../../utils/get_string_by_oid';
import { Typography } from '../typography';
import {
  RowValue,
  TableRowTable,
} from '../certificate-details-parts/row';
import { Link } from '../link';
import {
  getDNSNameLink,
  getIPAddressLink,
  getLEILink,
} from '../../utils/third_party_links';
import type { ILinkTemplateResolvers } from '../../utils/link_template_resolvers';
import type { IExtensionNode } from '../../crypto/extension-parsers/types';

export type { ILinkTemplateResolvers };

export type TNodeLinkContext = Partial<ILinkTemplateResolvers>;

function resolveHref(nodeData: IExtensionNode): string | undefined {
  if (!nodeData._type || nodeData.value == null) return undefined;
  const v = String(nodeData.value);

  switch (nodeData._type) {
    case 'dNSName': return getDNSNameLink(v);
    case 'iPAddress': return getIPAddressLink(v);
    case 'lei': return getLEILink(v);
    default: return undefined;
  }
}

export function renderLeafNode(nodeData: IExtensionNode, ctx: TNodeLinkContext) {
  const title = getStringByOID(nodeData.title, true);
  const href = resolveHref(nodeData);
  const value = nodeData.value != null ? getStringByOID(String(nodeData.value)) : '';

  if (nodeData._type === 'authorityKeyId' && nodeData.value != null) {
    const parentHref = ctx.getAuthKeyIdParentLink?.(value);
    const siblingsHref = ctx.getAuthKeyIdSiblingsLink?.(value);

    return (
      <RowValue
        name={title}
        value={value}
        monospace
        extraValue={[
          parentHref && (
            <span>
              &nbsp;[
              <Link href={parentHref}>
                parents
              </Link>
              ]
            </span>
          ),
          siblingsHref && (
            <span>
              &nbsp;[
              <Link href={siblingsHref}>
                siblings
              </Link>
              ]
            </span>
          ),
        ]}
      />
    );
  }

  if (nodeData._type === 'subjectKeyId' && nodeData.value != null) {
    const childrenHref = ctx.getSubjectKeyIdChildrenLink?.(value);
    const siblingsHref = ctx.getSubjectKeyIdSiblingsLink?.(value);

    return (
      <RowValue
        name={title}
        value={value}
        monospace
        extraValue={[
          childrenHref && (
            <span>
              &nbsp;[
              <Link href={childrenHref}>
                children
              </Link>
              ]
            </span>
          ),
          siblingsHref && (
            <span>
              &nbsp;[
              <Link href={siblingsHref}>
                siblings
              </Link>
              ]
            </span>
          ),
        ]}
      />
    );
  }

  return (
    <RowValue
      name={title}
      value={value}
      href={href}
    />
  );
}

export function renderNode(nodeData: IExtensionNode, ctx: TNodeLinkContext) {
  if (nodeData.title && !nodeData.value?.toString()) {
    return [
      <RowValue
        name={getStringByOID(nodeData.title)}
        value=""
      />,
      <TableRowTable>
        {nodeData.children?.map((child) => renderNode(child, ctx))}
      </TableRowTable>,
    ];
  }

  if (nodeData.children?.length) {
    return (
      <TableRowTable>
        {nodeData.title && (
          <tr>
            <td colSpan={2}>
              <Typography variant="b2" color="gray-9">
                {getStringByOID(nodeData.title)}
              </Typography>
            </td>
          </tr>
        )}
        {nodeData.children.map((child) => renderNode(child, ctx))}
      </TableRowTable>
    );
  }

  return renderLeafNode(nodeData, ctx);
}
