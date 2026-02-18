/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import {
  RowTitle,
  RowValue,
  TableRowTable,
} from './row';
import type { RenderRow, RowsFormat } from '../../crypto/rows_format';

interface IJsonCertificateParserProps {
  json: RowsFormat;
}

function hasRowGroup(r: RenderRow): r is RenderRow & { name: string; $groups: RenderRow[][] } {
  return (r as { type?: string }).type === 'rowGroup'
    && '$groups' in r
    && Array.isArray((r as { $groups?: RenderRow[][] }).$groups);
}

function hasRows(r: RenderRow): r is RenderRow & { name: string; $rows: RenderRow[] } {
  return '$rows' in r && Array.isArray((r as { $rows?: RenderRow[] }).$rows);
}

function renderRows(rows: RenderRow[]): unknown[] {
  const elements: unknown[] = [];

  for (const r of rows) {
    if (hasRowGroup(r)) {
      if (r.$groups.length === 0) continue;

      elements.push(
        <RowValue name={r.name} value="" />,
        ...r.$groups.map((group) => (
          <TableRowTable>
            {renderRows(group)}
          </TableRowTable>
        )),
      );

      continue;
    }

    if (hasRows(r)) {
      if (r.$rows.length === 0) continue;

      if (!r.name) {
        elements.push(...renderRows(r.$rows));
      } else {
        elements.push(
          <RowTitle value={r.name} />,
          ...renderRows(r.$rows),
        );
      }
      continue;
    }

    const { name, value, monospace, collapse, href } = r as { name: string; value: string | number; monospace?: boolean; collapse?: boolean; href?: string };

    if (value === undefined || value === null) {
      continue;
    }

    elements.push(
      <RowValue
        name={name}
        value={value}
        monospace={monospace}
        collapse={collapse}
        href={href}
      />,
    );
  }

  return elements;
}

export const JsonCertificateParser: FunctionalComponent<IJsonCertificateParserProps> = (props) => {
  const { json } = props;

  if (!json || !json.$rows || !Array.isArray(json.$rows)) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return renderRows(json.$rows) as any;
};
