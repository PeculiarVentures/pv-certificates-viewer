/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { FunctionalComponent, h } from '@stencil/core';
import type { TColor } from '../../interface';

export const CrossIcon: FunctionalComponent<{ color?: TColor }> = (props) => {
  const { color = 'gray-9' } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      fill="none"
    >
      <path
        fill={`var(--pv-color-${color})`}
        fill-rule="evenodd"
        d="m16.37 15 5.442 5.44c.25.252.25.663 0 .914l-.459.457a.646.646 0 0 1-.913 0L15 16.371l-5.44 5.44a.648.648 0 0 1-.915 0l-.457-.457a.649.649 0 0 1 0-.913L13.63 15 8.188 9.56a.649.649 0 0 1 0-.914l.457-.457a.648.648 0 0 1 .915 0l5.44 5.44 5.44-5.44a.646.646 0 0 1 .913 0l.46.457c.25.25.25.662 0 .913L16.37 15Z"
        clip-rule="evenodd"
      />
    </svg>
  );
};
