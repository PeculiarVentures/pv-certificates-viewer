/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h } from '@stencil/core';
import type { IExtensionNode } from '../../../crypto/extensions/types';
import type { ILinkTemplateResolvers } from '../../../utils/link_template_resolvers';
import { getStringByOID } from '../../../utils/get_string_by_oid';
import { getDNSNameLink, getIPAddressLink, getLEILink } from '../../../utils/third_party_links';
import { RowValue, TableRowTable } from '../details/row';
import { Link } from '../link';
import { Typography } from '../typography';

export type { ILinkTemplateResolvers };

export type TNodeLinkContext = Partial<ILinkTemplateResolvers>;

function resolveHref(nodeData: IExtensionNode): string | undefined {
  if (!nodeData._type || nodeData.value == null) return undefined;
  const v = String(nodeData.value);

  switch (nodeData._type) {
    case 'dNSName':
      return getDNSNameLink(v);
    case 'iPAddress':
      return getIPAddressLink(v);
    case 'lei':
      return getLEILink(v);
    default:
      return undefined;
  }
}

/** A key identifier row followed by optional "[parents]"-style links. */
function renderKeyIdRow(title: string, value: string, links: [string, string | undefined][]) {
  return (
    <RowValue
      name={title}
      value={value}
      monospace
      extraValue={links.map(
        ([label, href]) =>
          href && (
            <span>
              &nbsp;[
              <Link href={href}>{label}</Link>]
            </span>
          ),
      )}
    />
  );
}

export function renderLeafNode(nodeData: IExtensionNode, ctx: TNodeLinkContext) {
  const title = getStringByOID(nodeData.title ?? '', true);
  const href = resolveHref(nodeData);
  const value = nodeData.value != null ? getStringByOID(String(nodeData.value)) : '';

  if (nodeData.value != null && nodeData._type === 'authorityKeyId') {
    return renderKeyIdRow(title, value, [
      ['parents', ctx.getAuthKeyIdParentLink?.(value)],
      ['siblings', ctx.getAuthKeyIdSiblingsLink?.(value)],
    ]);
  }

  if (nodeData.value != null && nodeData._type === 'subjectKeyId') {
    return renderKeyIdRow(title, value, [
      ['children', ctx.getSubjectKeyIdChildrenLink?.(value)],
      ['siblings', ctx.getSubjectKeyIdSiblingsLink?.(value)],
    ]);
  }

  return (
    <RowValue
      name={title}
      // eslint-disable-next-line no-nested-ternary
      value={typeof nodeData.value === 'boolean' ? (nodeData.value ? 'YES' : 'NO') : value}
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
      <TableRowTable>{nodeData.children?.map((child) => renderNode(child, ctx))}</TableRowTable>,
    ];
  }

  if (nodeData.children?.length) {
    return (
      <TableRowTable>
        {nodeData.title && (
          <tr>
            <td colSpan={2}>
              <Typography
                variant="b2"
                color="gray-9"
              >
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
