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

interface IJsonToHtmlParserProps {
  data: TJsonRenderFormat;
}

function formatRowValue(value: string | number | boolean): string | number {
  if (value === true) return 'Yes';
  if (value === false) return 'No';

  return typeof value === 'number' ? value : String(value);
}

function renderValue(key: string, value: TJsonRenderValue): unknown[] {
  const elements: unknown[] = [];

  if (value === null || value === undefined) {
    return elements;
  }

  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    elements.push(
      <RowValue name={key} value={formatRowValue(value)} />,
    );

    return elements;
  }

  if (isFlatRows(value)) {
    const flatItems = Array.isArray(value)
      ? value
      : (value as unknown as IFlatRowsMarker).value;

    elements.push(
      <RowValue name={key} value="" />,
      <TableRowTable>
        {flatItems.flatMap((item) => {
          if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
            return renderObject(item as Record<string, TJsonRenderValue>);
          }

          return [<RowValue name={key} value={String(item)} />];
        })}
      </TableRowTable>,
    );

    return elements;
  }

  if (Array.isArray(value)) {
    const hasObjects = value.some(
      (item) => typeof item === 'object' && item !== null && !Array.isArray(item),
    );

    if (hasObjects) {
      const groupElements = value
        .filter((item) => item !== null && item !== undefined)
        .map((item) => {
          if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
            return renderObject(item as Record<string, TJsonRenderValue>);
          }

          return [<RowValue name={key} value={String(item)} />];
        });

      elements.push(
        <RowValue name={key} value="" />,
        ...groupElements.map((group) => (
          <TableRowTable>
            {group}
          </TableRowTable>
        )),
      );
    } else {
      const primitives = value
        .filter((item) => item !== null && item !== undefined)
        .map((item) => String(item));

      elements.push(
        <RowValue name={key} value={primitives.join(', ')} />,
      );
    }

    return elements;
  }

  if (typeof value === 'object') {
    const inner = renderObject(value as Record<string, TJsonRenderValue>);

    elements.push(
      <RowValue name={key} value="" />,
      <TableRowTable>
        {inner}
      </TableRowTable>,
    );

    return elements;
  }

  return elements;
}

function renderObject(obj: Record<string, TJsonRenderValue>): unknown[] {
  const elements: unknown[] = [];

  for (const [key, value] of Object.entries(obj)) {
    if (value === null || value === undefined) continue;
    elements.push(...renderValue(key, value));
  }

  return elements;
}

export const JsonToHtmlParser: FunctionalComponent<IJsonToHtmlParserProps> = (props) => {
  const { data } = props;

  if (!data || typeof data !== 'object') {
    return null;
  }

  const sections: unknown[] = [];

  for (const [sectionName, sectionValue] of Object.entries(data)) {
    if (sectionValue === null || sectionValue === undefined) continue;

    let content: unknown[];

    if (typeof sectionValue === 'string' || typeof sectionValue === 'number' || typeof sectionValue === 'boolean') {
      content = [<RowValue name={sectionName} value={formatRowValue(sectionValue)} />];
    } else if (isFlatRows(sectionValue)) {
      const flatItems = Array.isArray(sectionValue)
        ? sectionValue
        : (sectionValue as unknown as IFlatRowsMarker).value;

      content = flatItems.flatMap((item) => {
        if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
          return renderObject(item as Record<string, TJsonRenderValue>);
        }

        return [<RowValue name={sectionName} value={String(item)} />];
      });
    } else if (Array.isArray(sectionValue)) {
      const hasObjects = sectionValue.some(
        (item) => typeof item === 'object' && item !== null && !Array.isArray(item),
      );

      if (hasObjects) {
        const groupElements = sectionValue
          .filter((item) => item !== null && item !== undefined)
          .map((item) => {
            if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
              return renderObject(item as Record<string, TJsonRenderValue>);
            }

            return [<RowValue name={sectionName} value={String(item)} />];
          });

        content = [
          ...groupElements.map((group) => (
            <TableRowTable>
              {group}
            </TableRowTable>
          )),
        ];
      } else {
        const primitives = sectionValue
          .filter((item) => item !== null && item !== undefined)
          .map((item) => String(item));

        content = [<RowValue name={sectionName} value={primitives.join(', ')} />];
      }
    } else {
      content = renderObject(sectionValue as Record<string, TJsonRenderValue>);
    }

    sections.push(
      <RowTitle value={sectionName} />,
      ...content,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return sections as any;
};
