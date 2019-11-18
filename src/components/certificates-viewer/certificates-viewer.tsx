import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'pv-certificates-viewer',
  styleUrl: 'certificates-viewer.css',
  shadow: true
})
export class CertificatesViewer {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
