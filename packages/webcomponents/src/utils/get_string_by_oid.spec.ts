import { describe, it, expect } from 'vitest';
import { getStringByOID } from './get_string_by_oid';

describe('getStringByOID', () => {
  it('returns label and OID for a known identifier', () => {
    expect(getStringByOID('2.5.4.3')).toBe('Common Name (2.5.4.3)');
  });

  it('returns only the label when onlyLabel is true', () => {
    expect(getStringByOID('2.5.4.3', true)).toBe('Common Name');
  });

  it('returns the raw OID when unknown and onlyLabel is false', () => {
    expect(getStringByOID('1.2.3.4.5.6.7')).toBe('1.2.3.4.5.6.7');
  });

  it('returns the raw OID when unknown and onlyLabel is true', () => {
    expect(getStringByOID('1.2.3.4.5.6.7', true)).toBe('1.2.3.4.5.6.7');
  });
});
