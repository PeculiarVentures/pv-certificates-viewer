import { h } from '@stencil/core';
import isLink from '../../utils/is_link';

export function rowValue(
  name: string,
  value: string | number,
  options: { monospace?: boolean; collapse?: boolean } = {},
) {
  if (!name) {
    return null;
  }

  if (value === undefined || value === null) {
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
        {isLink(value.toString()) ? (
          <a
            class="peculiar_color_primary peculiar_b3"
            href={value.toString()}
            target="_blank"
            rel="noreferrer noopener"
          >
            {value}
          </a>
        ) : (
          <peculiar-typography
            monospace={options.monospace}
          >
            {elementValue}
          </peculiar-typography>
        )}
      </td>
    </tr>
  );
}
