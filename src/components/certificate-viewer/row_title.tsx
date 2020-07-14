import { h } from '@stencil/core';

export function rowTitle(title: string) {
  if (!title) {
    return null;
  }

  return (
    <tr class="title">
      <td colSpan={2}>
        <peculiar-typography
          type="h6"
        >
          {title}
        </peculiar-typography>
      </td>
    </tr>
  );
}
