import { Component, Host, h, Prop, State } from '@stencil/core';

export interface IAction {
  text: string;
  onClick: (event: MouseEvent) => void;
}

@Component({
  tag: 'peculiar-button-split',
  styleUrl: 'button-split.css',
  shadow: true,
})
export class ButtonSplit {
  @Prop() onClick: (event: MouseEvent) => void;
  @Prop() fill: 'stroke' | 'fill' = 'stroke';
  @Prop() actions: IAction[] = [];

  @State() activeSplit: boolean = false;

  onClickSplitButton = (event: MouseEvent) => {
    event.stopPropagation();

    this.activeSplit = !this.activeSplit;
  }

  onClickActiveButton(action: IAction['onClick'], event: MouseEvent) {
    this.activeSplit = false;

    action(event);
  }

  renderActiveSplitState() {
    if (!this.activeSplit) {
      return null;
    }

    return (
      <div class="active_split_container fill_white">
        {this.actions.map(action => (
          <peculiar-button
            fill="fill"
            class="button_split_action"
            onClick={this.onClickActiveButton.bind(this, action.onClick)}
          >
            {action.text}
          </peculiar-button>
        ))}
      </div>
    );
  }

  render() {
    return (
      <Host>
        <peculiar-button
          fill={this.fill}
          onClick={this.onClick}
          class="button_split"
        >
          <slot></slot>
        </peculiar-button>
        <peculiar-button
          fill={this.fill}
          onClick={this.onClickSplitButton}
          class="button_split_with_icon"
        >
          <svg
            viewBox="0 0 7 5"
            xmlns="http://www.w3.org/2000/svg"
            class="button_split_icon svg_fill_primary"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.459.124c.934.001 1.442.994.84 1.644L4.425 3.794c-.44.475-1.244.475-1.684 0L.862 1.764C.26 1.115.77.12 1.705.122l3.754.003z"
            />
          </svg>
        </peculiar-button>
        {this.renderActiveSplitState()}
      </Host>
    );
  }
}
