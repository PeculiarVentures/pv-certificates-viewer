import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const short = (date: string | number | Date) => (
  dayjs(date).format('ddd, MMM D, YYYY h:mm A')
);

export const fromNow = (date: string | number | Date) => (
  dayjs(date).fromNow()
);
