/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import { id_pkcs9_at_extensionRequest } from '@peculiar/asn1-pkcs9';
import { getStringByOID } from '../../utils/get_string_by_oid';
import { Typography } from '../typography';
import {
  RowTitle, RowValue, TableRowTable,
} from '../certificate-details-parts/row';
import type { ILinkTemplateResolvers } from '../../utils/link_template_resolvers';
import type { IParsedAttribute } from '../../crypto/attribute-parsers/types';
import type { IParsedExtension } from '../../crypto/extension-parsers/types';
import { renderNode } from '../parsed-node-renderer/render_node';
import { ParsedExtensions } from '../parsed-extensions-viewer/parsed-extensions-viewer';

export interface IParsedAttributesProps extends Partial<ILinkTemplateResolvers> {
  title?: string;
  attributes: IParsedAttribute[];
}

export const ParsedAttributes: FunctionalComponent<IParsedAttributesProps> = (props) => {
  const {
    attributes,
    title = 'Attributes',
    ...ctx
  } = props;

  if (!attributes?.length) {
    return null;
  }

  return [
    <RowTitle value={title} />,
    attributes.map((attribute) => [
      <tr>
        <td colSpan={2}>
          <Typography variant="s2" color="gray-9">
            {getStringByOID(attribute.oid)}
          </Typography>
        </td>
      </tr>,
      attribute.oid === id_pkcs9_at_extensionRequest
        ? attribute.children.map((child) => ([
            <RowValue
              name={'title' in child ? child.title : ''}
              value=""
            />,
            <TableRowTable>
              <ParsedExtensions
                title=""
                extensions={child.children as IParsedExtension[]}
              />
            </TableRowTable>,
          ]))
        : (
            attribute.children.map((child) => renderNode(child, ctx))
          ),
      <tr>
        <td colSpan={2} class="divider">
          <span />
        </td>
      </tr>,
    ]),
  ];
};
