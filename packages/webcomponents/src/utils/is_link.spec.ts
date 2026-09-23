import { describe, it, expect } from 'vitest';
import isLink from './is_link';

describe('isLink', () => {
  it('returns true for http and https URLs', () => {
    expect(isLink('http://example.com')).toBe(true);
    expect(isLink('https://example.com/path')).toBe(true);
  });

  it('returns false for non-http values', () => {
    expect(isLink('ftp://example.com')).toBe(false);
    expect(isLink('example.com')).toBe(false);
    expect(isLink('')).toBe(false);
  });
});
