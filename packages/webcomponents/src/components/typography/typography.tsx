/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { FunctionalComponent, h } from '@stencil/core';
import type { TTypography, TColor } from '../../interface';

interface ITypographyProps {
  component?: keyof JSX.IntrinsicElements;
  variant?: TTypography;
  color?: TColor;
  class?: string;
}

const variantMapping: Record<TTypography, 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  s1: 'h6',
  s2: 'h6',
  b1: 'p',
  b2: 'p',
  b3: 'p',
  btn1: 'span',
  btn2: 'span',
  c1: 'p',
  c2: 'p',
};

export const Typography: FunctionalComponent<ITypographyProps> = (props, children) => {
  const {
    component: componentProp,
    variant = 'b2',
    color = 'black',
    class: classProp,
    ...other
  } = props;

  const Component = componentProp || variantMapping[variant] || 'p';

  return (
    <Component
      {...other}
      class={{
        typography: true,
        [`t-${variant}`]: true,
        [`c-${color}`]: true,
        [classProp]: Boolean(classProp),
      }}
    >
      {children}
    </Component>
  );
};
