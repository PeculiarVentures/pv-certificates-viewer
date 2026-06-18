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
} from '../certificate-details-parts/row';
import type { ILinkTemplateResolvers } from '../../utils/link_template_resolvers';
import type { IParsedExtension } from '../../crypto/extension-parsers/types';
import { renderNode } from '../parsed-node-renderer/render_node';

export interface IParsedExtensionsProps extends Partial<ILinkTemplateResolvers> {
  title?: string;
  extensions: IParsedExtension[];
}

export const ParsedExtensions: FunctionalComponent<IParsedExtensionsProps> = (props) => {
  const {
    extensions,
    title = 'Extensions',
    ...ctx
  } = props;

  if (!extensions?.length) {
    return null;
  }

  return [
    <RowTitle value={title} />,
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
        extension.children.map((child) => renderNode(child, ctx)),
        <tr>
          <td colSpan={2} class="divider">
            <span />
          </td>
        </tr>,
      ];
    }),
  ];
};
