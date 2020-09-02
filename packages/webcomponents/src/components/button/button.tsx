/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  Component, h, Prop,
} from '@stencil/core';

@Component({
  tag: 'peculiar-button',
  styleUrl: 'button.scss',
  shadow: true,
})
export class Button {
  @Prop() fill?: 'stroke' | 'fill' = 'stroke';

  /**
   * Set to true to disable the button.
   * */
  @Prop({ reflect: true }) disabled?: boolean;

  /**
   * When set, the underlying button will be rendered as an `<a>` with
   * this `href` instead of a `<button>`.
   * */
  @Prop() href?: string;

  /**
   * Tells the browser where to open the link. Only used when `href` is set.
   * */
  @Prop() target: '_blank' | '_parent' | '_self' | '_top';

  @Prop() onClick: (event: MouseEvent) => void;

  handleClick = (event: MouseEvent) => {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      this.onClick(event);
    }
  };

  render() {
    const isLink = !!this.href;
    const TagType = isLink ? 'a' : 'button';

    return (
      <TagType
        class={{
          button: true,

          button_stroke: this.fill === 'stroke',
          button_fill: this.fill === 'fill',

          button_disabled: this.disabled,
        }}
        disabled={this.disabled}
        type={!isLink && 'button'}
        href={isLink && this.href}
        target={isLink && this.target ? this.target : null}
        rel={isLink && 'noreferrer noopener'}
        onClick={this.handleClick}
        part="base"
      >
        <span part="label" class="button_label">
          <slot />
        </span>
      </TagType>
    );
  }
}
