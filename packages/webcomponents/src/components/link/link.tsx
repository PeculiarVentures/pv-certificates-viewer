/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { FunctionalComponent, h } from '@stencil/core';
import type { TTypography } from '../../interface';
import { Typography } from '../typography';

interface ILinkProps {
  href: string;
  variant?: TTypography;
}

export const Link: FunctionalComponent<ILinkProps> = (props, children) => {
  const {
    href,
    variant,
  } = props;

  return (
    <Typography
      component="a"
      variant={variant}
      color="secondary"
      // @ts-expect-error - href is a string
      href={href}
      target="_blank"
      rel="noreferrer noopener"
    >
      {children}
    </Typography>
  );
};
