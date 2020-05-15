import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'peculiar-typography',
  styleUrl: 'typography.scss',
  shadow: true,
})
export class PeculiarTypography {
  /**
   * Typography type.
   */
  @Prop() type: 'h4' | 'h6' | 'h7' | 'b1' | 'b3' = 'b3';

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
    const {
      type = 'b3',
      color = 'dark',
    } = this;
    const TagType = type && type.includes('h') ? type : 'p';

    return (
      <Host
        class={{
          [`peculiar_${type}`]: true,
          [`peculiar_color_${color}`]: true,
          [`align_${this.align}`]: !!this.align,
        }}
      >
        <TagType
          class={{
            typography_native: true,
            ellipsis: this.ellipsis,
            monospace: this.monospace,
          }}
        >
          <slot />
        </TagType>
      </Host>
    );
  }
}
