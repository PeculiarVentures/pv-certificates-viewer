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
  tag: 'peculiar-link',
  styleUrl: 'link.scss',
  shadow: true,
})
export class Link {
  @Prop({ reflect: true }) href: string;

  /**
   * Typography type.
   */
  @Prop({ reflect: true }) type: 'h4' | 'h6' | 'h7' | 'b1' | 'b3' = 'b3';

  render() {
    return (
      <a
        href={this.href}
        target="_blank"
        rel="noreferrer noopener"
        class={{
          link: true,

          [`link_type_${this.type || 'b3'}`]: true,
        }}
      >
        <slot />
      </a>
    );
  }
}
