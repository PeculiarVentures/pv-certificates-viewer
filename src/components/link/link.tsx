import { Component, Host, h, Prop } from '@stencil/core';

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
        >
          <slot />
        </a>
      </Host>
    );
  }
}
