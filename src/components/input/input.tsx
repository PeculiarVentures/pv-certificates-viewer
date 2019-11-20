import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'pv-input',
  styleUrls: [
    '../../styles/reset.css',
    '../../styles/theme.css',
    'input.css'
  ],
  shadow: true
})
export class Input {
  // Content props
  @Prop() placeholder: string;
  @Prop() class: string;

  // Handler props
  @Prop() onInput: (event: Event) => void;
  @Prop() onChange: (event: Event) => void;

  render() {
    const classnames = [
      this.class,
      'text_black',
      'stroke_grey_3_border',
      'input',
    ].join(' ');

    return (
      <Host>
        <input
          placeholder={this.placeholder}
          class={classnames}
          onInput={this.onInput}
          onChange={this.onChange}
          type="text"
        />
      </Host>
    );
  }

}
