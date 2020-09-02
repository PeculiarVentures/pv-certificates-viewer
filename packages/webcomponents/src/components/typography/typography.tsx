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

import { ColorType } from '../../interface';

@Component({
  tag: 'peculiar-typography',
  styleUrl: 'typography.scss',
  shadow: true,
})
export class PeculiarTypography {
  /**
   * Typography type.
   */
  @Prop({ reflect: true }) type: 'h4' | 'h6' | 'h7' | 'b1' | 'b3' = 'b3';

  /**
   * Component color from theme.
   */
  @Prop() color: ColorType = 'dark';

  /**
   * Text align.
   */
  @Prop() align?: 'left' | 'center' | 'right';

  /**
   * If `true`, the text will not wrap, but instead will truncate with a text overflow ellipsis.
   */
  @Prop() ellipsis?: boolean;

  @Prop() monospace?: boolean;

  render() {
    const TagType = this.type && this.type.includes('h') ? this.type : 'p';

    return (
      <TagType
        class={{
          typography: true,

          [`typography_type_${this.type || 'b3'}`]: true,
          [`typography_color_${this.color || 'dark'}`]: true,
          [`typography_align_${this.align}`]: !!this.align,

          typography_ellipsis: this.ellipsis,
          typography_monospace: this.monospace,
        }}
      >
        <slot />
      </TagType>
    );
  }
}
