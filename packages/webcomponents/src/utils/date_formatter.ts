/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

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

  return start.to(end, true);
};
