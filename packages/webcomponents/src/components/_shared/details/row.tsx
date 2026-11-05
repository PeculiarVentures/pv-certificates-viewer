/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import isLink from '../../../utils/is_link';
import { ArrowBottomIcon } from '../icons';
import { Link } from '../link';
import { Typography } from '../typography';

export const TableRowTable: FunctionalComponent = (_, children) => (
  <tr>
    <td colSpan={2}>
      <table>{children}</table>
    </td>
  </tr>
);

interface IRowTitleProps {
  value: string | string[];
}

export const RowTitle: FunctionalComponent<IRowTitleProps> = (props) => {
  const { value } = props;

  if (!value) {
    return null;
  }

  return [
    <tr class="title">
      <td colSpan={2}>
        <Typography
          variant="s1"
          color="black"
        >
          {value}
        </Typography>
      </td>
    </tr>,
    <tr>
      <td
        colSpan={2}
        class="divider"
      >
        <span />
      </td>
    </tr>,
  ];
};

interface IRowValueProps {
  name: string | string[];
  value?: string | number | string[] | null;
  monospace?: boolean;
  collapse?: boolean;
  href?: string;
  extraValue?: Element[];
}

export const RowValue: FunctionalComponent<IRowValueProps> = (props) => {
  const { name, value, monospace, collapse, href, extraValue } = props;

  if (!name) {
    return null;
  }

  if (value === undefined || value === null) {
    return null;
  }

  let elementValue;

  if (collapse) {
    // The value stays outside <details> so it can be selected without toggling; see `.text_hider` styles.
    elementValue = (
      <span class="text_hider">
        <span class="text_hider_content">{value}</span>
        <details class="text_hider_toggle">
          <summary
            class="button m_no_padding"
            aria-label="Show full value"
          >
            <ArrowBottomIcon color="secondary" />
          </summary>
        </details>
      </span>
    );
  } else {
    elementValue = value;
  }

  const hasValue = !!value.toString();

  return (
    <tr>
      <td colSpan={hasValue ? 1 : 2}>
        <Typography
          variant="b2"
          color="gray-9"
        >
          {name}
        </Typography>
      </td>
      {hasValue && (
        <td class={{ monospace: Boolean(monospace) }}>
          {isLink(value.toString()) || href ? (
            <Link
              variant="b2"
              href={href || value.toString()}
            >
              {value}
            </Link>
          ) : (
            <Typography
              variant="b2"
              color="black"
            >
              {elementValue}
              {extraValue}
            </Typography>
          )}
        </td>
      )}
    </tr>
  );
};
