/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  Component,
  h,
  State,
  Prop,
  Host,
} from '@stencil/core';
import { Button, ButtonProps } from '../button';
import { Typography } from '../typography';

export interface ButtonMenuGroupOptions extends ButtonProps {
  text: string;
}

export interface ButtonMenuGroup {
  title: string;
  options: ButtonMenuGroupOptions[];
}

@Component({
  tag: 'peculiar-button-menu',
  styleUrl: 'button-menu.scss',
  scoped: true,
})
export class ButtonMenu {
  @Prop() groups: ButtonMenuGroup[] = [];

  @State() open: boolean = false;

  handleClick = () => {
    this.open = !this.open;
  };

  render() {
    return (
      <Host
        class={{
          is_shown: this.open,
        }}
      >
        <Button
          class="button_popover"
          onClick={this.handleClick}
          startIcon={(
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="31"
              fill="none"
            >
              <path
                fill="var(--pv-color-gray-10)"
                d="M15 13.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm14 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"
              />
            </svg>
          )}
        />
        <div
          role="dialog"
          tabIndex={-1}
          class="popover"
          aria-hidden={String(this.open)}
        >
          {this.groups.map((group) => (
            <div class="group">
              <Typography
                variant="c2"
                color="gray-9"
                class="group_title"
              >
                {group.title}
              </Typography>
              {group.options.map((option) => (
                <Button
                  class="button_option"
                  startIcon={option.startIcon}
                  href={option.href}
                  onClick={(event) => {
                    this.handleClick();

                    if (option.onClick) {
                      option.onClick(event);
                    }
                  }}
                >
                  {option.text}
                </Button>
              ))}
            </div>
          ))}
        </div>
      </Host>
    );
  }
}
