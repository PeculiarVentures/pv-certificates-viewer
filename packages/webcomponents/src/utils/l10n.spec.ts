import { describe, it, expect } from 'vitest';
import { Localization } from './l10n';

describe('Localization', () => {
  it('defaults to English from navigator language', () => {
    const localization = new Localization();

    expect(localization.getLocale()).toBe('en');
    expect(localization.getString('basicInformation')).toBe('Basic Information');
  });

  it('falls back to English for unsupported locales', () => {
    const localization = new Localization();

    localization.setLocale('zz' as 'en');

    expect(localization.getLocale()).toBe('en');
  });

  it('splits strings when a replacer pattern matches', () => {
    const localization = new Localization();
    const result = localization.getString('download.pem', {
      pattern: ' ',
      replacer: '→',
    });

    expect(result).toEqual(['Download', '→', 'PEM']);
  });
});
