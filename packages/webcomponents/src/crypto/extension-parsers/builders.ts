/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type {
  IExtensionNode, TExtensionNodeType, TPrimitive,
} from './types';

export const node = (
  title: string,
  value: TPrimitive,
  _type?: TExtensionNodeType,
): IExtensionNode => ({
  title,
  value,
  ...(_type && { _type }),
});

export const section = (title: string, children: IExtensionNode[]): IExtensionNode => ({
  title,
  children,
});
