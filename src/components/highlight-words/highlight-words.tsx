import { Component, Host, h, Element, Prop } from '@stencil/core';
@Component({
  tag: 'pv-highlight-words',
  styleUrl: 'highlight-words.css',
  shadow: true
})
export class HighlightWords {
  @Element() host: HTMLElement;

  @Prop() search: string;

  private tag: string = 'mark';

  componentDidLoad() {
    this.handleHighlightSearch();
  }

  componentDidUpdate() {
    this.handleHighlightSearch();
  }

  handleHighlightSearch() {
    const basicString = this.resetHighlightSearch(this.host.innerHTML);
    const substring = new RegExp(`(${this.search})`, 'gi');
    this.host.innerHTML = basicString.replace(substring, `<${this.tag}>$1</${this.tag}>`);
  }

  resetHighlightSearch(source: string) {
    const substring = new RegExp(`<\/?${this.tag}>`, 'g');
    return source.replace(substring, '');
  }

  render() {
    return (
      <Host>
        <slot />
      </Host>
    );
  }
}
