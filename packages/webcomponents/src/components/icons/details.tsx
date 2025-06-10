/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { FunctionalComponent, h } from '@stencil/core';
import type { TColor } from '../../interface';

export const DetailsIcon: FunctionalComponent<{ color?: TColor }> = (props) => {
  const { color = 'secondary' } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="31"
      fill="none"
    >
      <path
        fill={`var(--pv-color-${color})`}
        d="M6.71 19.79a1 1 0 0 0-.33-.21 1 1 0 0 0-.76 0 1 1 0 0 0-.33.21 1 1 0 0 0-.21.33 1 1 0 0 0 .21 1.09c.097.088.209.16.33.21a.94.94 0 0 0 .76 0 1.15 1.15 0 0 0 .33-.21 1 1 0 0 0 .21-1.09 1 1 0 0 0-.21-.33ZM10 11.5h14a1 1 0 0 0 0-2H10a1 1 0 0 0 0 2Zm-3.29 3.29a1 1 0 0 0-1.09-.21 1.15 1.15 0 0 0-.33.21 1 1 0 0 0-.21.33.94.94 0 0 0 0 .76c.05.121.122.233.21.33.097.088.209.16.33.21a.94.94 0 0 0 .76 0 1.15 1.15 0 0 0 .33-.21 1.15 1.15 0 0 0 .21-.33.94.94 0 0 0 0-.76 1 1 0 0 0-.21-.33ZM24 14.5H10a1 1 0 0 0 0 2h14a1 1 0 0 0 0-2ZM6.71 9.79a1 1 0 0 0-.33-.21 1 1 0 0 0-1.09.21 1.15 1.15 0 0 0-.21.33.94.94 0 0 0 0 .76c.05.121.122.233.21.33.097.088.209.16.33.21a1 1 0 0 0 1.09-.21 1.15 1.15 0 0 0 .21-.33.94.94 0 0 0 0-.76 1.15 1.15 0 0 0-.21-.33ZM24 19.5H10a1 1 0 0 0 0 2h14a1 1 0 0 0 0-2Z"
      />
    </svg>
  );
};
