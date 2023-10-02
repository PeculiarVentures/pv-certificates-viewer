/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { FunctionalComponent, h } from '@stencil/core';
import type { ColorType } from '../../interface';

export const LinkIcon: FunctionalComponent<{ color?: ColorType }> = (props) => {
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
        d="M21 14.32a1 1 0 0 0-1 1v7.18a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1h7.18a1 1 0 0 0 0-2H8a3 3 0 0 0-3 3v11a3 3 0 0 0 3 3h11a3 3 0 0 0 3-3v-7.18a1 1 0 0 0-1-1Zm3.92-8.2a1 1 0 0 0-.54-.54A1 1 0 0 0 24 5.5h-6a1 1 0 1 0 0 2h3.59l-10.3 10.29a1.002 1.002 0 0 0 .325 1.639 1 1 0 0 0 1.095-.219L23 8.91v3.59a1 1 0 0 0 2 0v-6a1.001 1.001 0 0 0-.08-.38Z"
      />
    </svg>
  );
};
