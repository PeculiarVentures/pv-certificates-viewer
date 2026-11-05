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

interface IHolderProps {
  holder: IExtensionNode[];
}

export const Holder: FunctionalComponent<IHolderProps> = (props) => {
  const { holder } = props;

  if (!holder?.length) {
    return null;
  }

  return [<RowTitle value="Holder" />, ...holder.map((n) => renderNode(n, {}))];
};
