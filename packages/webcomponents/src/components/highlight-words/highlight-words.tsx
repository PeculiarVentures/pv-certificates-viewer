/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  Component, Host, h, Element, Prop,
} from '@stencil/core';

@Component({
  tag: 'peculiar-highlight-words',
  styleUrl: 'highlight-words.scss',
  shadow: true,
})
export class HighlightWords {
  @Element() host: HTMLElement;

  @Prop() search: string;

  private tag = 'mark';

  componentDidLoad() {
    this.handleHighlightSearch();
  }

  componentDidUpdate() {
    this.handleHighlightSearch();
  }

  handleHighlightSearch() {
    const basicString = this.resetHighlightSearch(this.host.innerHTML);
    let result = basicString;

    if (this.search) {
      const substring = new RegExp(`(${this.search})`, 'gi');

      result = basicString.replace(substring, `<${this.tag}>$1</${this.tag}>`);
    }

    this.host.innerHTML = result;
  }

  resetHighlightSearch(source: string) {
    // eslint-disable-next-line no-useless-escape
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
