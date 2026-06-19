/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import type { IExtensionNode } from '../../crypto/extension-parsers/types';
import { l10n } from '../../utils';
import { renderNode } from '../parsed-node-renderer/render_node';
import { RowTitle } from './row';

interface IIssuerProps {
  issuer: IExtensionNode[];
}

export const Issuer: FunctionalComponent<IIssuerProps> = (props) => {
  const { issuer } = props;

  if (!issuer?.length) {
    return null;
  }

  return [
    <RowTitle
      value={l10n.getString('issuer')}
    />,
    ...issuer.map((n) => renderNode(n, {})),
  ];
};
