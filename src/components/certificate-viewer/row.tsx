import { h, FunctionalComponent } from '@stencil/core';

import isLink from '../../utils/is_link';

interface IRowTitleProps {
  value: string;
}

export const RowTitle: FunctionalComponent<IRowTitleProps> = (props) => {
  const { value } = props;

  if (!value) {
    return null;
  }

  return (
    <tr class="title">
      <td colSpan={2}>
        <peculiar-typography
          type="h6"
        >
          {value}
        </peculiar-typography>
      </td>
    </tr>
  );
};

interface IRowValueProps {
  name: string;
  value: string | number;
  monospace?: boolean;
  collapse?: boolean;
  href?: string;
  extraValue?: Element[];
}

export const RowValue: FunctionalComponent<IRowValueProps> = (props) => {
  const {
    name,
    value,
    monospace,
    collapse,
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

  if (collapse) {
    elementValue = (
      <peculiar-text-hider>
        {value}
      </peculiar-text-hider>
    );
  } else {
    elementValue = value;
  }

  return (
    <tr>
      <td>
        <peculiar-typography
          color="grey_5"
        >
          {name}:
        </peculiar-typography>
      </td>
      <td
        class={{
          monospace,
        }}
      >
        {(isLink(value.toString()) || href) ? (
          <peculiar-link
            href={href || value.toString()}
          >
            {value}
          </peculiar-link>
        ) : (
          <peculiar-typography
            monospace={monospace}
          >
            {elementValue}
            {extraValue}
          </peculiar-typography>
        )}
      </td>
    </tr>
  );
};
