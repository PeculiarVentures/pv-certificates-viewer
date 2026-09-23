import { describe, it, expect } from 'vitest';
import { dateDiff, dateShort } from './date_formatter';

describe('dateShort', () => {
  it('formats a date as UTC string', () => {
    expect(dateShort('2020-06-15T12:00:00.000Z')).toBe('Mon, 15 Jun 2020 12:00:00 GMT');
  });
});

describe('dateDiff', () => {
  it('returns empty string when either date is missing', () => {
    expect(dateDiff('', new Date())).toBe('');
    expect(dateDiff(new Date(), '')).toBe('');
  });

  it('returns a human-readable interval between two dates', () => {
    expect(dateDiff('2020-01-01', '2021-01-01')).toBe('a year');
  });
});
