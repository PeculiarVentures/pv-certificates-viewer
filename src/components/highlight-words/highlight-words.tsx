import { Component, Host, h, Element, Prop } from '@stencil/core';
@Component({
  tag: 'pv-highlight-words',
  styleUrl: 'highlight-words.css',
  shadow: true
})
export class HighlightWords {
  @Element() host: HTMLElement;

  @Prop() search: string;

  componentDidLoad() {
    this.handleHighlightSearch();
  }

  componentDidUpdate() {
    this.handleHighlightSearch();
  }

  handleHighlightSearch() {
    const basicString = this.resetHighlightSearch(this.host.innerHTML);
    const substring = new RegExp(`(${this.search})`, 'g');
    this.host.innerHTML = basicString.replace(substring, '<mark>$1</mark>');
  }

  resetHighlightSearch(source: string) {
    return source.replace(/<\/?mark>/g, '');
  }

  render() {
    return (
      <Host>
        <slot />
      </Host>
    );
  }
}