import { FunctionalComponent, h } from '@stencil/core';
import type { TypographyType, ColorType } from '../../interface';

interface TypographyProps {
  component?: keyof JSX.IntrinsicElements;
  variant?: TypographyType;
  color?: ColorType;
}

const variantMapping: Record<TypographyType, 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'> = {
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

export const Typography: FunctionalComponent<TypographyProps> = (props, children) => {
  const {
    component: componentProp,
    variant = 'b2',
    color = 'black',
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
      }}
    >
      {children}
    </Component>
  );
};
