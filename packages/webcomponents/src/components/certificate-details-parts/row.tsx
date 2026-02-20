/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import { Convert } from 'pvtsutils';
import isLink from '../../utils/is_link';
import { Typography } from '../typography';
import { Link } from '../link';

export const TableRowTable: FunctionalComponent = (_, children) => (
  <tr>
    <td colSpan={2}>
      <table>
        {children}
      </table>
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
      <td colSpan={2} class="divider">
        <span />
      </td>
    </tr>,
  ];
};

interface IRowValueProps {
  name: string | string[];
  value: string | number | string[];
  collapse?: boolean;
  href?: string;
  extraValue?: Element[];
}

export const RowValue: FunctionalComponent<IRowValueProps> = (props) => {
  const {
    name,
    value,
    href,
    extraValue,
  } = props;

  if (!name) {
    return null;
  }

  if (value === undefined || value === null) {
    return null;
  }

  let elementValue;

  const isHexValue = Convert.isHex(value) && value.length > 128;
  const isLinkValue = isLink(value.toString());

  if (isHexValue) {
    elementValue = (
      <peculiar-text-hider>
        {value}
      </peculiar-text-hider>
    );
  } else {
    elementValue = value;
  }

  const hasValue = !!value.toString();

  return (
    <tr>
      <td
        colSpan={hasValue ? 1 : 2}
      >
        <Typography
          variant="b2"
          color="gray-9"
        >
          {name}
        </Typography>
      </td>
      {hasValue && (
        <td
          class={{ monospace: isHexValue }}
        >
          {(isLinkValue || href)
            ? (
                <Link
                  variant="b2"
                  href={href || value.toString()}
                >
                  {value}
                </Link>
              )
            : (
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
