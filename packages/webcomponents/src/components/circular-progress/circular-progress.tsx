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
  Prop,
} from '@stencil/core';

@Component({
  tag: 'peculiar-circular-progress',
  styleUrl: 'circular-progress.scss',
  shadow: true,
})
export class CircularProgress {
  /**
   * Width/height of progress circle.
   */
  @Prop() size = 24;

  /**
   * Stroke width of progress bar circle.
   */
  @Prop() width = 4;

  private box = 50;

  render() {
    return (
      <Host>
        <div
          class="circle_progress"
          style={{
            width: `${this.size}px`,
            height: `${this.size}px`,
          }}
        >
          <svg
            class="circle_progress_svg"
            viewBox={`0 0 ${this.box} ${this.box}`}
          >
            <circle
              class="circle_progress_backdrop"
              cx={this.box / 2}
              cy={this.box / 2}
              r={(this.box / 2) - 5}
              fill="none"
              style={{ strokeWidth: `${this.width}px` }}
            />
            <circle
              class="circle_progress_circle"
              cx={this.box / 2}
              cy={this.box / 2}
              r={(this.box / 2) - 5}
              fill="none"
              style={{ strokeWidth: `${this.width}px` }}
            />
          </svg>
        </div>
      </Host>
    );
  }
}
