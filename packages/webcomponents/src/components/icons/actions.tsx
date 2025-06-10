/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { FunctionalComponent, h } from '@stencil/core';
import type { TColor } from '../../interface';

export const ActionsIcon: FunctionalComponent<{ color?: TColor }> = (props) => {
  const { color = 'gray-10' } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="31"
      fill="none"
    >
      <path
        fill={`var(--pv-color-${color})`}
        d="M15 13.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm14 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"
      />
    </svg>
  );
};
