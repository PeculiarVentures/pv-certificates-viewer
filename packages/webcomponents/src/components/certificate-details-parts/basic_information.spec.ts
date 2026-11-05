import { describe, expect, it } from 'vitest';
import { toDisplayVersion } from './basic_information';

describe('toDisplayVersion', () => {
  it('converts the 0-based ASN.1 version', () => {
    expect(toDisplayVersion(0)).toBe(1);
    expect(toDisplayVersion(1)).toBe(2);
  });

  it('hides an absent version', () => {
    expect(toDisplayVersion(undefined)).toBeUndefined();
  });
});
