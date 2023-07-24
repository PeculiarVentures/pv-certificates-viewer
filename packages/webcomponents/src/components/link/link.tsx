import { FunctionalComponent, h } from '@stencil/core';
import type { TypographyType } from '../../interface';
import { Typography } from '../typography';

interface LinkProps {
  href: string;
  variant?: TypographyType;
}

export const Link: FunctionalComponent<LinkProps> = (props, children) => {
  const {
    href,
    variant,
  } = props;

  return (
    <Typography
      component="a"
      variant={variant}
      color="secondary"
      // @ts-ignore
      href={href}
      target="_blank"
      rel="noreferrer noopener"
    >
      {children}
    </Typography>
  );
};
