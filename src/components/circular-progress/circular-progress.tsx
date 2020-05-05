import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'peculiar-circular-progress',
  styleUrl: 'circular-progress.css',
  shadow: true,
})
export class CircularProgress {

  /**
   * Width/height of progress circle.
   */
  @Prop() size: number = 24;
  /**
   * Stroke width of progress bar circle.
   */
  @Prop() width: number = 4;

  private box: number = 50;

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
              style={{
                strokeWidth: `${this.width}px`,
              }}
            />
            <circle
              class="circle_progress_circle"
              cx={this.box / 2}
              cy={this.box / 2}
              r={(this.box / 2) - 5}
              fill="none"
              style={{
                strokeWidth: `${this.width}px`,
              }}
            />
          </svg>
        </div>
      </Host>
    );
  }

}
