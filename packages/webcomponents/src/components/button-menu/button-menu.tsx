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
import { Button, IButtonProps } from '../button';
import { Typography } from '../typography';
import { ActionsIcon } from '../icons';

export interface IButtonMenuGroupOptions extends IButtonProps {
  text: string | string[];
}

export interface IButtonMenuGroup {
  title: string | string[];
  options: IButtonMenuGroupOptions[];
}

@Component({
  tag: 'peculiar-button-menu',
  styleUrl: 'button-menu.scss',
  scoped: true,
})
export class ButtonMenu {
  @Prop() groups: IButtonMenuGroup[] = [];

  @State() open = false;

  handleClick = () => {
    this.open = !this.open;
  };

  render() {
    return (
      <Host
        class={{ is_shown: this.open }}
      >
        <Button
          class="button_popover"
          startIcon={<ActionsIcon />}
          onClick={this.handleClick}
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
                    event.stopPropagation();

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
