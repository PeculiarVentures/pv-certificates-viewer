/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

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
