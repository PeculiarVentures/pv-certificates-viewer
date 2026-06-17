/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { ExtensionNode, Primitive } from './types';

export const node = (title: string, value: Primitive): ExtensionNode => ({
  title,
  value,
});

export const section = (title: string, children: ExtensionNode[]): ExtensionNode => ({
  title,
  children,
});
