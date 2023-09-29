/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { FunctionalComponent, h } from '@stencil/core';
import type { ColorType } from '../../interface';

export const ArrowTopIcon: FunctionalComponent<{ color?: ColorType }> = (props) => {
  const { color = 'gray-10' } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      fill="none"
    >
      <path
        stroke={`var(--pv-color-${color})`}
        // eslint-disable-next-line react/no-unknown-property
        stroke-linecap="round"
        stroke-width="1.5"
        d="m11.222 17.722 3.852-4.28a.2.2 0 0 1 .297 0l3.851 4.28"
      />
    </svg>
  );
};
