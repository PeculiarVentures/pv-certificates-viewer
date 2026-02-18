/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * $rows format - the sole syntax for certificate/extension rendering.
 * Row types:
 * 1. row - simple key-value (RowValue)
 * 2. section - big title (RowTitle) + flat rows, no TableRowTable
 * 3. rowGroup - label like RowValue + rows in TableRowTable
 */
export type RenderRow =
  | {
      type?: 'row';
      name: string;
      value: string | number;
      monospace?: boolean;
      collapse?: boolean;
      href?: string;
    }
  | {
      type?: 'section';
      name: string;
      $rows: RenderRow[];
    }
  | {
      type: 'rowGroup';
      name: string;
      $groups: RenderRow[][];
    };

export interface RowsFormat {
  $rows: RenderRow[];
}

function isHexString(value: string): boolean {
  return value.length > 0
    && value.length % 2 === 0
    && /^[0-9a-fA-F]+$/.test(value);
}

/**
 * Create a simple row with optional display options.
 */
export function row(
  name: string,
  value: string | number,
  options?: { monospace?: boolean; collapse?: boolean; href?: string },
): RenderRow {
  return {
    name,
    value: String(value),
    ...options,
  };
}

/**
 * Create a row for hex values (monospace, collapse if length > 40).
 */
export function hexRow(name: string, value: string): RenderRow {
  const hex = typeof value === 'string' ? value : String(value);

  return {
    name,
    value: hex,
    monospace: isHexString(hex),
    collapse: isHexString(hex) && hex.length > 40,
  };
}

/**
 * Section - big title (RowTitle) + flat rows without TableRowTable.
 */
export function section(name: string, rows: RenderRow[]): RenderRow {
  return {
    type: 'section',
    name,
    $rows: rows.filter((r) => r !== undefined),
  };
}

/**
 * rowGroup - label like RowValue + rows wrapped in TableRowTable.
 */
export function rowGroup(name: string, rows: RenderRow[][]): RenderRow {
  return {
    type: 'rowGroup',
    name,
    $groups: rows.filter((r) => r !== undefined),
  };
}

/**
 * Convert a plain object (e.g. from GeneralNameParser) to RenderRow[].
 * Used for nested structures where keys are labels and values are primitives or nested objects.
 */
export function objectToRows(obj: Record<string, unknown>): RenderRow[] {
  const result: RenderRow[] = [];

  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined || value === null) continue;

    if (typeof value === 'string' || typeof value === 'number') {
      result.push(row(key, value));
    } else if (Array.isArray(value)) {
      result.push(rowGroup(key, [value.flatMap((item) => {
        if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
          return objectToRows(item as Record<string, unknown>);
        }

        return [row(key, String(item))];
      })]));
    } else if (typeof value === 'object') {
      result.push(rowGroup(key, [objectToRows(value as Record<string, unknown>)]));
    }
  }

  return result;
}
