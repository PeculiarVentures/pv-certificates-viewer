import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'pv-circular-progress',
  styleUrl: 'circular-progress.css',
  shadow: true
})
export class CircularProgress {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
