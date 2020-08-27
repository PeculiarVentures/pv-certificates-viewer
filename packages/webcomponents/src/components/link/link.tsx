/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  Component, Host, h, Prop,
} from '@stencil/core';

@Component({
  tag: 'peculiar-link',
  styleUrl: 'link.scss',
  shadow: true,
})
export class Link {
  @Prop() href: string;

  render() {
    return (
      <Host class="peculiar_color_primary peculiar_b3">
        <a
          href={this.href}
          target="_blank"
          rel="noreferrer noopener"
          class="link_native"
        >
          <slot />
        </a>
      </Host>
    );
  }
}