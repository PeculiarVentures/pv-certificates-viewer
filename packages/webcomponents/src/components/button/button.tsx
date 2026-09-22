/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { FunctionalComponent, h, VNode } from '@stencil/core';
import { Typography } from '../typography';

export interface IButtonProps {
  href?: string;
  class?: string;
  startIcon?: VNode;
  onClick?: (event: MouseEvent) => void;
}

export const Button: FunctionalComponent<IButtonProps> = (props, children) => {
  const { href, class: classProp, startIcon, onClick } = props;

  const isLink = !!href;
  const TagType = isLink ? 'a' : 'button';

  return (
    <TagType
      type={isLink ? undefined : 'button'}
      href={isLink ? href : undefined}
      target={isLink ? '_blank' : undefined}
      rel={isLink ? 'noreferrer noopener' : undefined}
      class={{
        button: true,
        // eslint-disable-next-line react/destructuring-assignment
        m_no_padding: children.length === 0,
        ...(classProp ? { [classProp]: true } : {}),
      }}
      onClick={onClick}
    >
      {startIcon}
      {/* eslint-disable-next-line react/destructuring-assignment */}
      {children.length > 0 && (
        <Typography
          variant="b3"
          color="black"
          component="span"
        >
          {children}
        </Typography>
      )}
    </TagType>
  );
};
