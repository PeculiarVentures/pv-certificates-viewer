/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  Component,
  Host,
  h,
  State,
} from '@stencil/core';
import { Button } from '../button';
import { ArrowBottomIcon, ArrowTopIcon } from '../icons';

@Component({
  tag: 'peculiar-text-hider',
  styleUrl: 'text-hider.scss',
  scoped: true,
})
export class TextHider {
  @State() opened: boolean = false;

  render() {
    return (
      <Host
        aria-expanded={String(this.opened)}
      >
        <div class="content">
          <slot />
        </div>
        <Button
          class="action"
          onClick={() => { this.opened = !this.opened; }}
          startIcon={this.opened ? <ArrowTopIcon color="secondary" /> : <ArrowBottomIcon color="secondary" />}
        />
      </Host>
    );
  }
}
