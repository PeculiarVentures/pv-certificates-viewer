/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import type { IExtensionNode } from '../../../crypto/extensions/types';
import { renderNode } from '../parsed/render_node';
import { RowTitle } from './row';

interface IIssuerProps {
  issuer: IExtensionNode[];
}

export const Issuer: FunctionalComponent<IIssuerProps> = (props) => {
  const { issuer } = props;

  if (!issuer?.length) {
    return null;
  }

  return [<RowTitle value="Issuer" />, ...issuer.map((n) => renderNode(n, {}))];
};
