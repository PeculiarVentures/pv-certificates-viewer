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
import { RowTitle } from '../certificate-details-parts/row';
import type { ILinkTemplateResolvers } from '../../utils/link_template_resolvers';
import type { ParsedAttribute } from '../../crypto/attribute-parsers/types';
import type { ParsedExtension } from '../../crypto/extension-parsers/types';
import { renderNode } from '../parsed-node-renderer/render_node';
import { ParsedExtensions } from '../parsed-extensions-viewer/parsed-extensions-viewer';

export interface IParsedAttributesProps extends Partial<ILinkTemplateResolvers> {
  title?: string;
  attributes: ParsedAttribute[];
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

  const extensionReqAttr = attributes
    .find((a) => a.oid === id_pkcs9_at_extensionRequest);
  const otherAttrs = extensionReqAttr
    ? attributes.filter((a) => a.oid !== id_pkcs9_at_extensionRequest)
    : attributes;

  return [
    otherAttrs.length > 0 && [
      <RowTitle value={title} />,
      otherAttrs.map((attribute) => [
        <tr>
          <td colSpan={2}>
            <Typography variant="s2" color="gray-9">
              {getStringByOID(attribute.oid)}
            </Typography>
          </td>
        </tr>,
        attribute.children.map((child) => renderNode(child, ctx)),
        <tr>
          <td colSpan={2} class="divider">
            <span />
          </td>
        </tr>,
      ]),
    ],
    extensionReqAttr?.children.length > 0 && (
      <ParsedExtensions
        extensions={extensionReqAttr.children as ParsedExtension[]}
        {...ctx}
      />
    ),
  ];
};
