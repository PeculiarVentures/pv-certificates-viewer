/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  Component, h, Prop, Host,
} from '@stencil/core';

@Component({
  tag: 'peculiar-button',
  styleUrl: 'button.scss',
  shadow: true,
})
export class Button {
  @Prop() fill?: 'stroke' | 'fill' = 'stroke';

  @Prop() disabled?: boolean;

  @Prop() href?: string;

  @Prop() target?: string;

  render() {
    const TagType = this.href === undefined ? 'button' : 'a';
    const attrs = (TagType === 'button')
      ? { type: 'button' }
      : {
        href: this.href,
        target: this.target,
        rel: 'noreferrer noopener',
      };

    return (
      <Host
        class={{
          peculiar_b3: true,
          peculiar_button: true,
          peculiar_button_stroke: this.fill === 'stroke',
          peculiar_color_primary: this.fill === 'stroke',
          peculiar_color_light: this.fill === 'fill',
          peculiar_fill_primary: this.fill === 'fill',
          peculiar_button_disabled: this.disabled,
        }}
      >
        <TagType
          {...attrs}
          disabled={this.disabled}
          class="peculiar_button_native"
        >
          <span class="peculiar_button_inner">
            <slot />
          </span>
        </TagType>
      </Host>
    );
  }
}