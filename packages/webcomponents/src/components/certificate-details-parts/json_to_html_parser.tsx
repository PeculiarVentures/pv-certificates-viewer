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

/** Primitive values: string, number, boolean. */
export type TJsonRenderPrimitive = string | number | boolean;

/** Object with recursive JSON values. */
export interface IJsonRenderObject {
  [key: string]: TJsonRenderValue;
}

/** Simplified JSON value: primitive, object, or array (recursive). */
export type TJsonRenderValue = TJsonRenderPrimitive | IJsonRenderObject | TJsonRenderValue[];

/** Top-level format: each key is a section title. */
export type TJsonRenderFormat = IJsonRenderObject;

/**
 * Marker interface for flat rows (plain object from JSON).
 * ArrayFlat serializes to this shape.
 */
export interface IFlatRowsMarker {
  $flat: true;
  value: TJsonRenderValue[];
}

/**
 * Array that renders as flat rows (no TableRowTable per item).
 * Use for Subject Name, Issuer Name, Extensions, etc.
 * Encapsulates $flat logic; serializes to { $flat: true, value: [...] } for JSON round-trip.
 */
export class ArrayFlat<T = TJsonRenderValue> extends Array<T> {
  readonly $flat = true as const;

  constructor(...items: T[]) {
    super(...items);
    Object.defineProperty(this, '$flat', {
      value: true,
      enumerable: true,
      writable: false,
    });
  }

  get value(): T[] {
    return [...this];
  }

  toJSON(): IFlatRowsMarker {
    return {
      $flat: true,
      value: [...this] as TJsonRenderValue[],
    };
  }

  static from<T>(items: Iterable<T> | ArrayLike<T>): ArrayFlat<T> {
    return new ArrayFlat(...Array.from(items));
  }
}

function isFlatRows(value: unknown): value is ArrayFlat | IFlatRowsMarker {
  if (value instanceof ArrayFlat) return true;

  return (
    typeof value === 'object'
    && value !== null
    && (value as IFlatRowsMarker).$flat === true
    && Array.isArray((value as IFlatRowsMarker).value)
  );
}

function isObjectItem(item: unknown): item is Record<string, TJsonRenderValue> {
  return typeof item === 'object' && item !== null && !Array.isArray(item);
}

interface IJsonToHtmlParserProps {
  data: TJsonRenderFormat;
}

function formatPrimitive(value: string | number | boolean): string | number {
  if (value === true) return 'Yes';
  if (value === false) return 'No';

  return typeof value === 'number' ? value : String(value);
}

function renderPrimitive(label: string, value: string | number | boolean): unknown[] {
  return [<RowValue name={label} value={formatPrimitive(value)} />];
}

function renderFlatRows(
  label: string,
  items: TJsonRenderValue[],
  renderObject: (obj: Record<string, TJsonRenderValue>) => unknown[],
  opts?: { omitLabelRow?: boolean; skipTableWrapper?: boolean },
): unknown[] {
  const content = items.flatMap((item) => (
    isObjectItem(item)
      ? renderObject(item)
      : [<RowValue name={label} value={String(item)} />]
  ));

  if (opts?.skipTableWrapper) {
    return content;
  }

  const table = <TableRowTable>{content}</TableRowTable>;

  return opts?.omitLabelRow ? [table] : [<RowValue name={label} value="" />, table];
}

function renderArray(
  label: string,
  arr: TJsonRenderValue[],
  renderObject: (obj: Record<string, TJsonRenderValue>) => unknown[],
  opts?: { omitLabelRow?: boolean; skipTableWrapper?: boolean },
): unknown[] {
  const valid = arr.filter((i) => i !== null && i !== undefined);
  const hasObjects = valid.some(isObjectItem);

  if (hasObjects) {
    const items = valid.flatMap((item) => (
      isObjectItem(item)
        ? renderObject(item)
        : [<RowValue name={label} value={String(item)} />]
    ));

    if (opts?.skipTableWrapper) {
      return items;
    }

    const tables = valid.map((item) => (
      <TableRowTable>
        {isObjectItem(item)
          ? renderObject(item)
          : [<RowValue name={label} value={String(item)} />]}
      </TableRowTable>
    ));

    return opts?.omitLabelRow ? tables : [<RowValue name={label} value="" />, ...tables];
  }

  return [<RowValue name={label} value={valid.map(String).join(', ')} />];
}

interface IRenderOptions {
  omitLabelRow?: boolean;
  skipTableWrapper?: boolean;
}

type TRenderLabeledValue = (
  lbl: string,
  val: TJsonRenderValue,
  opts?: IRenderOptions,
) => unknown[];

function renderNestedObject(
  label: string,
  obj: Record<string, TJsonRenderValue>,
  renderLabeledValue: TRenderLabeledValue,
  opts?: IRenderOptions,
): unknown[] {
  const content = Object.entries(obj).flatMap(([k, v]) => (
    v == null ? [] : renderLabeledValue(k, v)
  ));

  if (opts?.skipTableWrapper) {
    return content;
  }

  const table = <TableRowTable>{content}</TableRowTable>;

  return opts?.omitLabelRow ? [table] : [<RowValue name={label} value="" />, table];
}

function renderLabeledValue(
  label: string,
  value: TJsonRenderValue,
  opts?: IRenderOptions,
): unknown[] {
  if (value === null || value === undefined) return [];

  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return renderPrimitive(label, value);
  }

  if (isFlatRows(value)) {
    const items = Array.isArray(value) ? value : (value as IFlatRowsMarker).value;

    return renderFlatRows(label, items, renderObject, opts);
  }

  if (Array.isArray(value)) {
    return renderArray(label, value, renderObject, opts);
  }

  if (typeof value === 'object') {
    return renderNestedObject(label, value, renderLabeledValue, opts);
  }

  return [];
}

function renderObject(obj: Record<string, TJsonRenderValue>): unknown[] {
  return Object.entries(obj).flatMap(([key, val]) => (
    val == null ? [] : renderLabeledValue(key, val)
  ));
}

export const JsonToHtmlParser: FunctionalComponent<IJsonToHtmlParserProps> = (props) => {
  const { data } = props;

  if (!data || typeof data !== 'object') {
    return null;
  }

  const sections: unknown[] = [];

  for (const [sectionName, sectionValue] of Object.entries(data)) {
    if (sectionValue === null || sectionValue === undefined) continue;

    const content = renderLabeledValue(sectionName, sectionValue, {
      omitLabelRow: true,
      skipTableWrapper: true,
    });

    sections.push(
      <RowTitle value={sectionName} />,
      ...content,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return sections as any;
};
