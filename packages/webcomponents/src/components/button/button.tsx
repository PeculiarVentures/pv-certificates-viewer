import { FunctionalComponent, h, VNode } from '@stencil/core';
import { Typography } from '../typography';

interface ButtonProps {
  href?: string;
  class?: string;
  startIcon?: VNode;
  onClick?: (event: MouseEvent) => void;
}

export const Button: FunctionalComponent<ButtonProps> = (props, children) => {
  const {
    href,
    class: classProp,
    startIcon,
    onClick,
  } = props;

  const isLink = !!href;
  const TagType = isLink ? 'a' : 'button';

  return (
    <TagType
      type={!isLink && 'button'}
      href={isLink && href}
      target={isLink && '_blank'}
      rel={isLink && 'noreferrer noopener'}
      onClick={onClick}
      class={{
        button: true,
        // eslint-disable-next-line react/destructuring-assignment
        m_no_padding: children.length === 0,
        [classProp]: Boolean(classProp),
      }}
    >
      {startIcon && (
        <span class="start_icon">
          {startIcon}
        </span>
      )}
      <Typography
        variant="b3"
        color="black"
        component="span"
      >
        {children}
      </Typography>
    </TagType>
  );
};
