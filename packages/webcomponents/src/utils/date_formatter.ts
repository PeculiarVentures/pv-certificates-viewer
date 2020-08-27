/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import dayjs from 'dayjs';

export const dateShort = (date: string | number | Date) => (
  new Date(date).toUTCString()
);

export const dateDiff = (
  dateStart: string | number | Date,
  dateEnd: string | number | Date,
) => {
  if (!dateStart || !dateEnd) {
    return '';
  }

  const start = dayjs(dateStart);
  const end = dayjs(dateEnd);
  const ending = (value: number) => (value === 1 ? '' : 's');

  const diffYears = end.diff(start, 'year', true);

  if (Number.isInteger(diffYears)) {
    return `${diffYears} year${ending(diffYears)}`;
  }

  const diffMonth = end.diff(start, 'month', true);

  if (Number.isInteger(diffMonth)) {
    return `${diffMonth} month${ending(diffMonth)}`;
  }

  const diffDays = end.diff(start, 'day');

  return `${diffDays} day${ending(diffDays)}`;
};
