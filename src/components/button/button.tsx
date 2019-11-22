import { Component, h, Prop, Host } from '@stencil/core';

@Component({
  tag: 'pv-button',
  styleUrls: [
    '../../styles/theme.css',
    '../../styles/system.css',
    'button.css',
  ],
  shadow: true,
})
export class Button {
  @Prop() fill: 'stroke' | 'fill' = 'stroke';
  @Prop() disabled: boolean;

  render() {
    return (
      <Host
        class={{
          b3: true,
          button: true,
          button_stroke: this.fill === 'stroke',
          stroke_secondary_border: this.fill === 'stroke',
          text_secondary: this.fill === 'stroke',
          text_white: this.fill === 'fill',
          fill_secondary: this.fill === 'fill',
          button_disabled: this.disabled,
        }}
      >
        <button
          type="button"
          disabled={this.disabled}
          class={{
            button_native: true,
          }}
        >
          <slot></slot>
        </button>
      </Host>
    );
  }
}
