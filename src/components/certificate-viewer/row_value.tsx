import { h } from '@stencil/core';

export function rowValue(
  name: string,
  value: string | number,
  options: { monospace?: boolean; collapse?: boolean; align?: 'middle' } = {},
) {
  if (!name || !value) {
    return null;
  }

  let elementValue;

  if (options.collapse) {
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
          monospace: options.monospace,
        }}
      >
        <peculiar-typography
          monospace={options.monospace}
        >
          {elementValue}
        </peculiar-typography>
      </td>
    </tr>
  );
}
